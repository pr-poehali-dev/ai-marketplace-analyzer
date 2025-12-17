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
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6">
            🔬 Основано на анализе 10 000+ карточек маркетплейсов
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            AI-анализ карточек<br />для роста продаж
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Находим ошибки, которые теряют вам <strong className="text-foreground">от 30% до 70% продаж</strong>.<br />
            Получите конкретный план действий за 10 секунд.
          </p>
          
          <Link to="/analyzer">
            <Button size="lg" className="h-16 px-12 text-lg font-semibold">
              Проверить карточку бесплатно
              <Icon name="ArrowRight" size={24} className="ml-2" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground mt-6">
            ⚡ Уже проверили <strong>2 847 карточек</strong> · Средний прирост конверсии +42%
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Реальные результаты продавцов
            </h2>
            <p className="text-muted-foreground text-lg">
              После исправления ошибок по рекомендациям MIRRO
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-primary/20">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">+156%</div>
                <div className="text-sm font-semibold mb-3">к показам в поиске</div>
                <p className="text-sm text-muted-foreground">
                  Заполнили все характеристики и оптимизировали заголовок
                </p>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                  Товары для дома · Wildberries
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-primary/20">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">+63%</div>
                <div className="text-sm font-semibold mb-3">конверсии в покупку</div>
                <p className="text-sm text-muted-foreground">
                  Добавили инфографику и убрали 3 стоп-фактора
                </p>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                  Электроника · Ozon
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-primary/20">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">+89%</div>
                <div className="text-sm font-semibold mb-3">к кликам по карточке</div>
                <p className="text-sm text-muted-foreground">
                  Обновили главное фото и добавили схему применения
                </p>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                  Красота и здоровье · Яндекс.Маркет
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Что проверяет MIRRO
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">SEO и ранжирование</h3>
              <p className="text-muted-foreground mb-4">
                Заголовок, ключевые слова, 15 обязательных характеристик
              </p>
              <div className="text-sm text-primary font-medium">
                → Влияет на позиции в поиске до 70%
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Визуал и кликабельность</h3>
              <p className="text-muted-foreground mb-4">
                Качество фото, инфографика, соответствие требованиям
              </p>
              <div className="text-sm text-primary font-medium">
                → Карточки с инфографикой: +60% кликов
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Стоп-факторы конверсии</h3>
              <p className="text-muted-foreground mb-4">
                Цена, описание, отзывы — то, что блокирует покупку
              </p>
              <div className="text-sm text-primary font-medium">
                → 1 стоп-фактор = -30% к конверсии
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Как это работает
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Простой процесс — конкретный результат
          </p>
          
          <div className="space-y-8 text-left">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Вставьте ссылку на карточку</h3>
                <p className="text-muted-foreground">
                  Скопируйте URL с WB, Ozon или Яндекс.Маркет — поддерживаем все площадки
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI проверит 6 критичных параметров</h3>
                <p className="text-muted-foreground">
                  Заголовок, характеристики, визуал, описание, цена, стоп-факторы — всё за 10 секунд
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Получите план с приоритетами</h3>
                <p className="text-muted-foreground">
                  Что исправить, почему это важно, какой эффект ожидать — конкретные действия, а не общие советы
                </p>
              </div>
            </div>
          </div>

          <Link to="/analyzer">
            <Button size="lg" className="mt-12">
              Начать анализ бесплатно
              <Icon name="Sparkles" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Вопросы и ответы
          </h2>

          <div className="space-y-4">
            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-bold mb-3">Почему MIRRO находит больше ошибок, чем я сам?</h3>
              <p className="text-muted-foreground mb-3">
                AI анализирует карточку по 47 параметрам за 10 секунд. Вручную это займёт 2-3 часа и вы всё равно пропустите критичные детали.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Основано на исследовании 10 000+ успешных карточек топ-продавцов
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-bold mb-3">Реально ли увеличить продажи, просто исправив карточку?</h3>
              <p className="text-muted-foreground mb-3">
                Да. В 80% случаев продавцы теряют от 30% до 70% продаж из-за ошибок в карточке: плохие позиции в поиске, низкая кликабельность, стоп-факторы.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Средний прирост конверсии у наших пользователей: +42% за первый месяц
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-bold mb-3">Что если у меня уже хорошая карточка?</h3>
              <p className="text-muted-foreground mb-3">
                Даже опытные продавцы находят 3-5 точек роста после анализа. Алгоритмы маркетплейсов меняются каждый месяц — то, что работало в прошлом году, сегодня уже не даёт результата.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Проверка бесплатная — ничего не теряете, но можете найти скрытые проблемы
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-bold mb-3">Какие маркетплейсы поддерживаются?</h3>
              <p className="text-muted-foreground mb-3">
                Wildberries, Ozon и Яндекс.Маркет — анализируем карточки на всех популярных площадках. Алгоритм учитывает специфику каждого маркетплейса.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-bold mb-3">Сколько стоит полный анализ?</h3>
              <p className="text-muted-foreground mb-3">
                Превью анализа с основными рекомендациями — бесплатно навсегда. Полный отчёт с детальным планом и приоритетами — для участников листа ожидания.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Присоединяйтесь к листу ожидания — первые 100 человек получат пожизненный доступ
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-bold mb-3">За какое время я увижу результат?</h3>
              <p className="text-muted-foreground mb-3">
                Быстрые правки (заголовок, характеристики) дают эффект через 3-7 дней. Полная оптимизация — через 2-4 недели. MIRRO показывает приоритеты, чтобы вы начали с самого важного.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Начните с TOP-3 рекомендаций — получите первые +15% к конверсии за неделю
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Готовы увеличить продажи?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Проверьте карточку за 10 секунд и получите конкретный план действий
          </p>
          <Link to="/analyzer">
            <Button size="lg" className="h-16 px-12 text-lg font-semibold">
              Начать бесплатный анализ
              <Icon name="Rocket" size={24} className="ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-6">
            ⚡ 10 секунд анализа · Конкретные рекомендации · Без регистрации
          </p>
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
                <p className="text-sm text-muted-foreground mb-3">
                  AI-анализ карточек для роста продаж на маркетплейсах
                </p>
                <p className="text-xs text-muted-foreground">
                  Основано на анализе 10 000+ карточек топ-продавцов
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Продукт</h4>
                <div className="space-y-2 text-sm">
                  <Link to="/analyzer" className="block text-muted-foreground hover:text-primary transition-colors">
                    Анализатор карточек
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
