import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={28} />
            <span className="text-xl font-bold">MIRRO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/analyzer" className="text-sm font-medium hover:text-primary transition-colors">
              Анализатор
            </Link>
            <Link to="/research" className="text-sm font-medium hover:text-primary transition-colors">
              Исследования
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Блог
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            AI-анализ карточек<br />для роста продаж
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Находим ошибки и точки роста в карточках маркетплейсов.<br />
            Получите план действий для увеличения конверсии.
          </p>
          
          <Link to="/analyzer">
            <Button size="lg" className="h-16 px-12 text-lg font-semibold">
              Проверить карточку
              <Icon name="ArrowRight" size={24} className="ml-2" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground mt-6">
            ⚡ Превью анализа — бесплатно, полный отчёт — для участников листа ожидания
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Что проверяет MIRRO
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">SEO и структура</h3>
              <p className="text-muted-foreground">
                Заголовок, ключевые слова, характеристики — всё, что влияет на позиции в поиске
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Визуал и фото</h3>
              <p className="text-muted-foreground">
                Качество изображений, инфографика, соответствие требованиям маркетплейсов
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Конверсия</h3>
              <p className="text-muted-foreground">
                Стоп-факторы покупки, цена, отзывы — то, что блокирует продажи
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-primary/5">
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
                <h3 className="text-xl font-bold mb-2">Вставьте ссылку</h3>
                <p className="text-muted-foreground">
                  Скопируйте ссылку на карточку с WB, Ozon или Яндекс.Маркет
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI проанализирует карточку</h3>
                <p className="text-muted-foreground">
                  Проверим 6 критичных параметров и найдём точки роста
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Получите рекомендации</h3>
                <p className="text-muted-foreground">
                  План действий с приоритетами — что исправить в первую очередь
                </p>
              </div>
            </div>
          </div>

          <Link to="/analyzer">
            <Button size="lg" className="mt-12">
              Начать анализ
              <Icon name="Sparkles" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Частые вопросы
          </h2>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">Какие маркетплейсы поддерживаются?</h3>
              <p className="text-muted-foreground">
                Wildberries, Ozon и Яндекс.Маркет. Анализируем все популярные площадки.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">Анализ действительно бесплатный?</h3>
              <p className="text-muted-foreground">
                Да! Превью анализа с основными рекомендациями — бесплатно. Полный отчёт доступен участникам листа ожидания.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">Как долго длится анализ?</h3>
              <p className="text-muted-foreground">
                5-10 секунд. AI проверяет карточку в режиме реального времени.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">Что я получу в результате?</h3>
              <p className="text-muted-foreground">
                Конкретный план действий: что исправить, почему это важно, какой эффект ожидать.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="TrendingUp" size={24} />
                  <span className="font-bold text-lg">MIRRO</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-анализ карточек MIRRO для роста продаж на маркетплейсах
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Продукт</h4>
                <div className="space-y-2 text-sm">
                  <Link to="/analyzer" className="block text-muted-foreground hover:text-primary transition-colors">
                    Анализатор
                  </Link>
                  <Link to="/research" className="block text-muted-foreground hover:text-primary transition-colors">
                    Исследования
                  </Link>
                  <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                    Блог
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Контакты</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>support@mirro.ai</p>
                  <p>Telegram: @mirro_support</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t text-center text-sm text-muted-foreground">
              © 2024 MIRRO. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
