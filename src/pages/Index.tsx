import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [showThanks, setShowThanks] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Укажите email или Telegram');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/a23fe291-57f2-4556-ba7c-3443ddc2a8d6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_or_telegram: email,
          comment: comment,
          source: 'landing'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowThanks(true);
        setEmail('');
        setComment('');
        toast.success(data.message || 'Спасибо! Мы напишем вам, когда откроем доступ');
      } else {
        toast.error(data.error || 'Произошла ошибка. Попробуйте позже');
      }
    } catch (error) {
      toast.error('Ошибка соединения. Попробуйте позже');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={28} />
            <span className="text-xl font-bold">MIRRO</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-md">
              Preview
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/analyzer" className="text-sm font-medium hover:text-primary transition-colors">
              Попробовать демо
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            AI-анализ карточек<br />маркетплейсов
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Находим ошибки в карточках товаров и даём конкретный план действий.<br />
            Без общих советов — только то, что реально влияет на продажи.
          </p>
          
          <Link to="/analyzer">
            <Button size="lg" className="h-16 px-12 text-lg font-semibold">
              Посмотреть демо
              <Icon name="ArrowRight" size={24} className="ml-2" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground mt-6">
            Сервис в разработке. Доступ открываем постепенно.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Что проверяет сервис
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">SEO карточки</h3>
              <p className="text-muted-foreground mb-4">
                Заголовок, ключевые слова, заполненность характеристик
              </p>
              <p className="text-sm text-muted-foreground">
                → Влияет на позиции в поиске маркетплейса
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Визуал</h3>
              <p className="text-muted-foreground mb-4">
                Качество фото, наличие инфографики, структура изображений
              </p>
              <p className="text-sm text-muted-foreground">
                → Влияет на клики и первое впечатление
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Конверсия</h3>
              <p className="text-muted-foreground mb-4">
                Описание, цена, стоп-факторы, которые блокируют покупку
              </p>
              <p className="text-sm text-muted-foreground">
                → Влияет на решение о покупке
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Как это работает
          </h2>
          
          <div className="space-y-8 text-left mt-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Вставьте ссылку на карточку</h3>
                <p className="text-muted-foreground">
                  WB, Ozon или Яндекс.Маркет
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI проверяет карточку</h3>
                <p className="text-muted-foreground">
                  Заголовок, характеристики, фото, описание, стоп-факторы
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Получаете план действий</h3>
                <p className="text-muted-foreground">
                  Конкретные рекомендации: что исправить и почему это важно
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            {!showThanks ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Получить ранний доступ
                  </h2>
                  <p className="text-muted-foreground">
                    Сервис находится в разработке. Мы открываем доступ постепенно.<br />
                    Запишитесь в лист ожидания — напишем, когда будет готово.
                  </p>
                </div>

                <form onSubmit={handleWaitlist} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <Label htmlFor="email" className="text-base">
                      Email или Telegram *
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com или @username"
                      className="mt-2 h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comment" className="text-base">
                      Комментарий (необязательно)
                    </Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Что думаете о сервисе? Что было бы полезно?"
                      className="mt-2 min-h-[80px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 text-base">
                    Записаться в лист ожидания
                    <Icon name="Send" size={20} className="ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Без спама. Напишем только когда откроем доступ.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon name="CheckCircle2" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Спасибо!</h3>
                <p className="text-muted-foreground mb-6">
                  Мы добавили вас в лист ожидания.<br />
                  Напишем, когда откроем доступ. Без спама.
                </p>
                <Link to="/analyzer">
                  <Button variant="outline">
                    Посмотреть демо-версию
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Вопросы
          </h2>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-3">Почему доступ ограничен?</h3>
              <p className="text-muted-foreground">
                Сервис находится в стадии разработки. Мы тестируем алгоритмы и собираем обратную связь от первых пользователей, чтобы сделать продукт действительно полезным.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-3">Какие маркетплейсы поддерживаются?</h3>
              <p className="text-muted-foreground">
                Wildberries, Ozon и Яндекс.Маркет. Алгоритм учитывает специфику каждой площадки.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-3">Это бесплатно?</h3>
              <p className="text-muted-foreground">
                Сейчас сервис в разработке, мы определяемся с моделью. Ранние пользователи получат доступ на выгодных условиях.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-3">Можно посмотреть, как это работает?</h3>
              <p className="text-muted-foreground mb-3">
                Да, доступна демо-версия. Она показывает концепцию сервиса и логику работы анализа.
              </p>
              <Link to="/analyzer">
                <Button variant="outline" size="sm">
                  Открыть демо
                  <Icon name="ExternalLink" size={16} className="ml-2" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="TrendingUp" size={24} />
                <span className="font-bold text-lg">MIRRO</span>
                <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-md">
                  Preview
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-анализ карточек маркетплейсов
              </p>
            </div>

            <div className="pt-8 mt-8 border-t text-center text-sm text-muted-foreground">
              © 2024 MIRRO. Сервис в разработке.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;