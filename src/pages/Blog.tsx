import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      title: 'Как написать заголовок, который увеличит продажи на 40%',
      date: '14 декабря 2024',
      author: 'Анна Соколова',
      category: 'SEO',
      readTime: '5 мин',
      excerpt: 'Простая формула заголовка для маркетплейсов. Покажем на реальных примерах, что работает.',
      image: '✍️',
    },
    {
      title: '5 ошибок в карточках, из-за которых вы теряете клиентов',
      date: '12 декабря 2024',
      author: 'Дмитрий Волков',
      category: 'Конверсия',
      readTime: '7 мин',
      excerpt: 'Разбираем типичные проблемы, которые снижают конверсию на 50%. Чек-лист для самопроверки.',
      image: '❌',
    },
    {
      title: 'Инфографика для карточек: что показывать покупателю',
      date: '8 декабря 2024',
      author: 'Мария Кузнецова',
      category: 'Визуал',
      readTime: '6 мин',
      excerpt: 'Какие элементы добавлять на фото товара, чтобы повысить кликабельность и конверсию.',
      image: '🎨',
    },
    {
      title: 'Как собрать первые 50 отзывов без накруток',
      date: '5 декабря 2024',
      author: 'Игорь Петров',
      category: 'Рост',
      readTime: '8 мин',
      excerpt: 'Легальные методы получения отзывов, которые работают. Пошаговый план на первый месяц.',
      image: '⭐',
    },
    {
      title: 'Что делать, если карточка не показывается в поиске',
      date: '1 декабря 2024',
      author: 'Олег Смирнов',
      category: 'SEO',
      readTime: '10 мин',
      excerpt: 'Чек-лист из 12 пунктов для диагностики проблем с ранжированием на WB и Ozon.',
      image: '🔧',
    },
    {
      title: 'Цена и конверсия: как найти баланс',
      date: '28 ноября 2024',
      author: 'Анна Соколова',
      category: 'Стратегия',
      readTime: '9 мин',
      excerpt: 'Тестировали 20 вариантов цен. Делимся данными и формулами для вашей ниши.',
      image: '💰',
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
            <Link to="/research" className="text-sm font-medium hover:text-primary transition-colors">
              Исследования
            </Link>
            <Link to="/blog" className="text-sm font-medium text-primary">
              Блог
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Блог о продажах
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Практические советы и кейсы для роста на маркетплейсах
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start gap-6">
                <div className="text-6xl flex-shrink-0">{post.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="User" size={16} />
                      <span>{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Читать
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center">
              <Icon name="Bell" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Получайте новые статьи первыми</h3>
              <p className="text-muted-foreground mb-6">
                Подпишитесь на рассылку — каждую неделю полезные материалы для роста продаж
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 h-12 px-4 rounded-md border bg-background"
                />
                <Button className="h-12 px-6">
                  Подписаться
                  <Icon name="Send" size={16} className="ml-2" />
                </Button>
              </div>
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

export default Blog;
