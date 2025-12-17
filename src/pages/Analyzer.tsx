import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Analyzer = () => {
  const [productUrl, setProductUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(-1);
  const [currentThought, setCurrentThought] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productLink: '',
    agreedToPolicy: false,
  });

  const analysisStages = [
    {
      title: 'Загружаю и парсю карточку товара',
      thoughts: [
        'Получаю HTML-страницу карточки...',
        'Извлекаю заголовок, описание, характеристики...',
        'Загружаю все изображения для анализа...',
        'Парсинг завершён, переход к анализу',
      ],
      found: 'Извлечено: заголовок (87 символов), 12 характеристик, 8 фото, описание (340 слов)',
      why: 'Полнота данных критична для точного анализа. Проверяю все элементы карточки.',
      recommendation: 'Все данные успешно извлечены',
      source: 'API маркетплейса',
    },
    {
      title: 'Анализирую заголовок и SEO-оптимизацию',
      thoughts: [
        'Проверяю длину заголовка (норма: 50-100 символов)...',
        'Ищу целевые ключевые слова в начале заголовка...',
        'Сравниваю с топ-10 конкурентов в категории...',
        'Проверяю читаемость и структуру...',
      ],
      found: 'Найдено 3 ключевых слова, но они в середине заголовка. Длина: 87 символов (норма)',
      why: 'Ключи в начале заголовка увеличивают показы в поиске на 35-40%. Алгоритм WB/Ozon придаёт больший вес первым 3-5 словам.',
      recommendation: 'Переместите целевые запросы в начало заголовка. Пример: "Смартфон Apple iPhone 15 Pro 256GB Black Titanium" → "iPhone 15 Pro 256GB Black Titanium — смартфон Apple"',
      source: 'Исследование MIRRO: 2 450 карточек топ-продавцов WB/Ozon',
    },
    {
      title: 'Проверяю характеристики и заполненность',
      thoughts: [
        'Считаю количество заполненных полей...',
        'Сравниваю с обязательными характеристиками категории...',
        'Проверяю наличие ключевых атрибутов (бренд, страна, материал)...',
        'Анализирую конкурентов: сколько полей заполнено у топ-10...',
      ],
      found: 'Заполнено 12 из 18 обязательных характеристик. У топ-10 конкурентов среднее: 16 полей',
      why: 'Незаполненные характеристики снижают ранжирование на 25-30%. Алгоритм считает карточку неполной и понижает в выдаче.',
      recommendation: 'Заполните недостающие поля: "Состав", "Гарантия", "Комплектация", "Особенности", "Сезон", "Назначение". Это добавит 200-300 позиций в поиске.',
      source: 'Анализ алгоритмов WB (май 2024), база MIRRO: 10 000+ карточек',
    },
    {
      title: 'Анализирую визуал и фотографии',
      thoughts: [
        'Проверяю разрешение главного фото (норма: 900x1200px)...',
        'Ищу инфографику и текстовые элементы на фото...',
        'Анализирую фон (белый/прозрачный обязателен для главного фото)...',
        'Считаю количество ракурсов и lifestyle-кадров...',
      ],
      found: 'Главное фото: 1200x1600px (✓). Фон белый (✓). Но нет инфографики, все 8 фото — просто товар без контекста',
      why: 'Карточки с инфографикой получают на 60% больше кликов. Покупатель должен видеть размеры, применение, преимущества.',
      recommendation: 'Добавьте на 2-4 фото: схему размеров, сравнение с аналогом, сценарий использования. Пример: "Влезет в рюкзак 30L" или "Работает 10 часов без подзарядки".',
      source: 'A/B тесты MIRRO (1 200 карточек, ноябрь 2024)',
    },
    {
      title: 'Проверяю описание товара',
      thoughts: [
        'Считаю длину описания (норма: 300-500 слов)...',
        'Ищу структурированные блоки (характеристики, применение, уход)...',
        'Проверяю читаемость: абзацы, списки, заголовки...',
        'Анализирую эмоциональные триггеры и выгоды...',
      ],
      found: 'Описание: 340 слов (✓). Но нет структуры — сплошной текст. Только технические характеристики, нет выгод.',
      why: 'Структурированное описание снижает возвраты на 25%. Покупатель должен быстро найти ответ на свой вопрос.',
      recommendation: 'Разбейте описание на блоки: "Для кого", "Как использовать", "Характеристики", "Уход". Добавьте списки и подзаголовки. Пример: "✓ Легко чистится" вместо "Материал не впитывает грязь".',
      source: 'Статистика возвратов WB/Ozon (2024), исследование MIRRO',
    },
    {
      title: 'Ищу стоп-факторы конверсии',
      thoughts: [
        'Проверяю цену: сравниваю с конкурентами (±20%)...',
        'Анализирую количество отзывов (норма: 10+ для старта)...',
        'Ищу негативные факторы: "Нет в наличии", "Долгая доставка"...',
        'Проверяю обоснование цены в описании...',
      ],
      found: 'Обнаружено 2 критичных стоп-фактора: 1) Всего 3 отзыва. 2) Цена на 35% выше среднего, но нет объяснения почему',
      why: 'Каждый стоп-фактор блокирует 30% покупателей. Мало отзывов = "Не проверено". Высокая цена без обоснования = "Переплата".',
      recommendation: 'Соберите первые 10-15 отзывов (подарите товар друзьям/знакомым). В описании добавьте: "Премиум-материалы", "Гарантия 3 года", "Ручная работа" — обоснуйте цену.',
      source: 'Исследование конверсии: 5 000 карточек (MIRRO, 2024)',
    },
    {
      title: 'Формирую итоговый план действий',
      thoughts: [
        'Ранжирую найденные проблемы по влиянию на продажи...',
        'Рассчитываю ожидаемый прирост конверсии для каждой правки...',
        'Определяю сложность и время реализации...',
        'Составляю план с приоритетами: что первым, что потом...',
      ],
      found: 'Готов план из 11 конкретных действий. Приоритет: характеристики → заголовок → инфографика',
      why: 'Правильная последовательность даёт результат в 3 раза быстрее. Начинаем с быстрых правок (1-2 дня), потом сложные (неделя).',
      recommendation: 'TOP-3 действия на эту неделю: 1) Заполните 6 недостающих характеристик (+15% к показам). 2) Переставьте ключи в заголовке (+8% кликов). 3) Добавьте инфографику на 3 фото (+20% конверсии).',
      source: 'Методология MIRRO: анализ 10 000+ успешных оптимизаций',
    },
  ];

  const handleAnalyze = () => {
    if (!productUrl.trim()) {
      toast.error('Введите ссылку на карточку товара');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStage(0);
    setCurrentThought('');
    setShowResults(false);

    let thoughtIndex = 0;
    let stageIndex = 0;
    const totalThoughts = analysisStages.reduce((sum, stage) => sum + stage.thoughts.length, 0);
    let completedThoughts = 0;

    const thoughtInterval = setInterval(() => {
      const stage = analysisStages[stageIndex];
      if (stage && thoughtIndex < stage.thoughts.length) {
        setCurrentThought(stage.thoughts[thoughtIndex]);
        setCurrentStage(stageIndex);
        thoughtIndex++;
        completedThoughts++;
        
        const progress = (completedThoughts / totalThoughts) * 100;
        setAnalysisProgress(progress);
      } else {
        if (stageIndex < analysisStages.length - 1) {
          stageIndex++;
          thoughtIndex = 0;
        } else {
          clearInterval(thoughtInterval);
          setIsAnalyzing(false);
          setShowResults(true);
          setAnalysisProgress(100);
          setCurrentStage(analysisStages.length - 1);
        }
      }
    }, 900);
  };

  const handleGetFullReport = () => {
    setFormData({ ...formData, productLink: productUrl });
    setShowLeadForm(true);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.agreedToPolicy) {
      toast.error('Заполните все обязательные поля и примите условия');
      return;
    }

    toast.success('Спасибо! Отчёт отправлен на вашу почту');
    setShowLeadForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="TrendingUp" size={28} />
            <span className="text-xl font-bold">MIRRO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/analyzer" className="text-sm font-medium text-primary">
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

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6">
              🔬 AI проверяет 47 параметров за 10 секунд
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Анализатор карточек
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Вставьте ссылку на карточку — AI найдёт ошибки и точки роста
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Вставьте ссылку на карточку WB, Ozon или Яндекс.Маркет"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="flex-1 h-14 text-base"
              />
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="h-14 px-8 text-base font-semibold"
              >
                {isAnalyzing ? 'Анализирую...' : 'Проверить'}
                <Icon name="Search" size={20} className="ml-2" />
              </Button>
            </div>
          </div>

          {(isAnalyzing || analysisProgress > 0) && (
            <Card className="p-8 animate-fade-in">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Анализ в процессе</h3>
                  <span className="text-lg font-semibold">{Math.floor(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2 mb-4" />
                
                {isAnalyzing && currentThought && (
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg animate-fade-in">
                    <Icon name="Brain" size={20} className="text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground italic">
                      {currentThought}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {analysisStages.map((stage, index) => (
                  <div
                    key={index}
                    className={`border-l-4 pl-6 py-4 transition-all duration-500 ${
                      index < currentStage
                        ? 'border-primary opacity-100'
                        : index === currentStage
                        ? 'border-primary opacity-100'
                        : 'border-muted opacity-40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {index < currentStage ? (
                        <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0 mt-1" />
                      ) : index === currentStage && isAnalyzing ? (
                        <Icon name="Loader2" size={24} className="text-primary flex-shrink-0 mt-1 animate-spin" />
                      ) : index === currentStage && !isAnalyzing ? (
                        <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0 mt-1" />
                      ) : (
                        <Icon name="Circle" size={24} className="text-muted-foreground flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">{stage.title}</h4>
                        {index <= currentStage && !isAnalyzing && (
                          <div className="space-y-3 animate-fade-in">
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <p className="text-sm text-foreground mb-1">
                                <strong>Результат:</strong> {stage.found}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <strong>Почему важно:</strong> {stage.why}
                            </p>
                            <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                              <p className="text-sm text-primary font-medium">
                                💡 {stage.recommendation}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                              <Icon name="Database" size={14} />
                              <span>Источник данных: {stage.source}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showResults && analysisProgress === 100 && (
                <div className="mt-8 pt-8 border-t">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon name="CheckCircle2" size={32} className="text-primary" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">
                      Анализ завершён!
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Найдено 11 точек роста. Потенциальный прирост конверсии: +43%
                    </p>
                  </div>

                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 mb-6">
                    <h5 className="text-lg font-bold mb-4">📋 План действий на эту неделю (превью):</h5>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Заполните 6 недостающих характеристик</p>
                          <p className="text-sm text-muted-foreground">Время: 15 минут · Эффект: +15% к показам</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Переместите ключевые слова в начало заголовка</p>
                          <p className="text-sm text-muted-foreground">Время: 5 минут · Эффект: +8% к кликам</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Добавьте инфографику на 3 фотографии</p>
                          <p className="text-sm text-muted-foreground">Время: 2-3 дня · Эффект: +20% к конверсии</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        + ещё 8 конкретных действий в полном отчёте
                      </p>
                    </div>
                  </Card>

                  <div className="text-center">
                    <Button size="lg" onClick={handleGetFullReport} className="mb-3">
                      Получить полный отчёт (PDF)
                      <Icon name="Download" size={20} className="ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Детальный план с примерами, чек-листом и ДО/ПОСЛЕ
                    </p>
                  </div>
                </div>
              )}
            </Card>
          )}

          {!isAnalyzing && analysisProgress === 0 && (
            <>
              <div className="mb-16">
                <Card className="p-8 text-center">
                  <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-3">Что проверит MIRRO AI?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6">
                    <div className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">SEO и ранжирование</p>
                        <p className="text-sm text-muted-foreground">Заголовок, ключевые слова, характеристики</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Визуал и фотографии</p>
                        <p className="text-sm text-muted-foreground">Качество, инфографика, требования площадок</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Описание товара</p>
                        <p className="text-sm text-muted-foreground">Структура, полнота, читаемость</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Стоп-факторы</p>
                        <p className="text-sm text-muted-foreground">Цена, отзывы, что блокирует покупку</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    🔬 Анализ основан на исследовании 10 000+ успешных карточек маркетплейсов
                  </p>
                </Card>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Примеры ДО и ПОСЛЕ оптимизации
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">
                        ❌ ДО оптимизации
                      </span>
                      <div className="bg-muted/30 rounded-lg p-4 mb-4">
                        <div className="text-6xl mb-3">📦</div>
                        <p className="text-sm font-medium mb-2">
                          "Чехол для телефона силиконовый прозрачный защитный"
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>• Характеристик: 8 из 15</p>
                          <p>• Без инфографики</p>
                          <p>• 2 отзыва</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-red-600">Конверсия: 1.2%</p>
                        <p className="text-xs text-muted-foreground">Позиция в поиске: 87</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-primary">
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-3">
                        ✅ ПОСЛЕ оптимизации
                      </span>
                      <div className="bg-primary/5 rounded-lg p-4 mb-4">
                        <div className="text-6xl mb-3">📱</div>
                        <p className="text-sm font-medium mb-2">
                          "Чехол iPhone 15 Pro силиконовый защитный — MagSafe, противоударный"
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>• Характеристик: 15 из 15 ✓</p>
                          <p>• Инфографика на 4 фото ✓</p>
                          <p>• 18 отзывов ✓</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-green-600">Конверсия: 3.8% (+217%)</p>
                        <p className="text-xs text-muted-foreground">Позиция в поиске: 12 ↑</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <h4 className="font-bold mb-2">Результат за 3 недели:</h4>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-3xl font-bold text-primary">+217%</p>
                        <p className="text-sm text-muted-foreground">конверсии</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary">+380%</p>
                        <p className="text-sm text-muted-foreground">показов</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary">↑75</p>
                        <p className="text-sm text-muted-foreground">позиций</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Получить полный отчёт (PDF)</DialogTitle>
            <DialogDescription>
              Детальный план действий, примеры, чек-лист. Отчёт придёт на вашу почту в течение 2 минут.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitLead} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivan@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="productLink">Ссылка на карточку</Label>
              <Input
                id="productLink"
                value={formData.productLink}
                onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                placeholder="https://..."
                className="mt-1"
                disabled
              />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="policy"
                checked={formData.agreedToPolicy}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, agreedToPolicy: checked as boolean })
                }
              />
              <Label htmlFor="policy" className="text-xs leading-relaxed cursor-pointer">
                Согласен на обработку персональных данных и получение отчёта по email. 
                Это поможет нам улучшить продукт для вас.
              </Label>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Получить отчёт
              <Icon name="Send" size={18} className="ml-2" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Ваши данные нужны только для отправки отчёта и тестирования MVP
            </p>
          </form>
        </DialogContent>
      </Dialog>

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

export default Analyzer;
