import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Сохраняет контакты пользователей в лист ожидания
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name и другими атрибутами
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    email_or_telegram: str = body_data.get('email_or_telegram', '').strip()
    comment: str = body_data.get('comment', '').strip()
    source: str = body_data.get('source', 'landing')
    
    if not email_or_telegram:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email или Telegram обязательны'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ['DATABASE_URL']
    conn = psycopg2.connect(database_url)
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "INSERT INTO waitlist (email_or_telegram, comment, source) VALUES (%s, %s, %s) RETURNING id, created_at",
                (email_or_telegram, comment if comment else None, source)
            )
            result = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'id': result['id'],
                    'message': 'Спасибо! Мы напишем вам, когда откроем доступ'
                }),
                'isBase64Encoded': False
            }
    finally:
        conn.close()
