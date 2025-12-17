import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Research = () => {
  const studies = [
    {
      title: 'Влияние инфографики на конверсию товаров',
      date: '15 декабря 2024',
      views: '2.3К',
      readTime: '8 мин',
      category: 'Визуал',
      description: 'Проанализировали 500 карточек с инфографикой и без неё. Результаты показали рост конверсии на 60%.',
      image: '📊',
    },
    {
      title: 'Какие характеристики влияют на выдачу WB',
      date: '10 декабря 2024',
      views: '1.8К',
      readTime: '12 мин',
      category: 'SEO',
      description: 'Глубокое исследование алгоритмов ранжирования Wildberries. 15 факторов, которые меняют позиции.',
      image: '🔍',
    },
    {
      title: 'Анализ 1000 карточек топ-продавцов Ozon',
      date: '5 декабря 2024',
      views: '3.1К',
      readTime: '15 мин',
      category: 'Кейсы',
      description: 'Что общего у всех лидеров продаж? Разбор структуры, текстов, визуала и стратегий.',
      image: '🏆',
    },
    {
      title: 'Стоп-факторы покупки: данные A/B тестов',
      date: '28 ноября 2024',
      views: '1.5К',
      readTime: '10 мин',
      category: 'Конверсия',
      description: 'Протестировали 50 гипотез и выявили 7 факторов, которые блокируют покупку в 80% случаев.',
      image: '🚫',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="TrendingUp" size={28} />
            <span className="text-xl font-bold">MIRRO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/analyzer" className="text-sm font-medium hover:text-primary transition-colors">
              Анализатор
            </Link>
            <Link to="/research" className="text-sm font-medium text-primary">
              Исследования
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Блог
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Исследования маркетплейсов
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Данные, тесты и инсайты для роста продаж на Wildberries, Ozon и Яндекс.Маркет
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((study, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{study.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                      {study.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{study.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {study.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      <span>{study.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{study.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Хотите первыми получать новые исследования?</h3>
            <p className="text-muted-foreground mb-6">
              Подпишитесь на рассылку — раз в неделю отправляем данные и инсайты для роста продаж
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 h-12 px-4 rounded-md border bg-background"
              />
              <Button className="h-12 px-6">
                Подписаться
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} />
              <span className="font-bold">MIRRO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MIRRO. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Research;
