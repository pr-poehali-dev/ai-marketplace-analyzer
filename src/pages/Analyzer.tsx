import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const analysisStages = [
    {
      title: 'Загружаю и парсю карточку товара',
      thoughts: [
        'Получаю HTML-страницу карточки...',
        'Извлекаю заголовок, описание, характеристики...',
        'Загружаю изображения для анализа...',
        'Парсинг завершён, переход к анализу',
      ],
      found: 'Извлечено: заголовок (87 символов), 12 характеристик, 8 фото, описание (340 слов)',
      why: 'Полнота данных важна для точного анализа.',
      recommendation: 'Все данные успешно извлечены',
    },
    {
      title: 'Анализирую заголовок и SEO',
      thoughts: [
        'Проверяю длину заголовка...',
        'Ищу ключевые слова...',
        'Сравниваю со структурой топовых карточек...',
        'Оцениваю читаемость...',
      ],
      found: 'Найдено 3 ключевых слова, но они в середине заголовка',
      why: 'Ключевые слова в начале заголовка влияют на видимость в поиске.',
      recommendation: 'Переместите целевые запросы в начало заголовка',
    },
    {
      title: 'Проверяю характеристики',
      thoughts: [
        'Считаю заполненные поля...',
        'Сравниваю с обязательными для категории...',
        'Проверяю ключевые атрибуты...',
        'Анализирую конкурентов...',
      ],
      found: 'Заполнено 12 из 18 обязательных характеристик',
      why: 'Незаполненные характеристики снижают видимость карточки.',
      recommendation: 'Заполните недостающие поля: состав, гарантия, комплектация',
    },
    {
      title: 'Анализирую визуал',
      thoughts: [
        'Проверяю разрешение фото...',
        'Ищу инфографику...',
        'Анализирую фон главного фото...',
        'Считаю количество ракурсов...',
      ],
      found: 'Главное фото: 1200x1600px, белый фон. Но нет инфографики',
      why: 'Инфографика помогает покупателю быстро понять характеристики.',
      recommendation: 'Добавьте схемы или сравнения на 2-3 фото',
    },
    {
      title: 'Проверяю описание',
      thoughts: [
        'Считаю длину описания...',
        'Ищу структурированные блоки...',
        'Проверяю читаемость...',
        'Анализирую наличие выгод...',
      ],
      found: 'Описание: 340 слов. Сплошной текст, нет структуры',
      why: 'Структура помогает покупателю найти нужную информацию.',
      recommendation: 'Разбейте на блоки: для кого, как использовать, характеристики',
    },
    {
      title: 'Ищу стоп-факторы',
      thoughts: [
        'Проверяю цену относительно конкурентов...',
        'Анализирую количество отзывов...',
        'Ищу негативные факторы...',
        'Проверяю обоснование цены...',
      ],
      found: 'Обнаружено 2 стоп-фактора: мало отзывов (3), цена выше среднего без обоснования',
      why: 'Стоп-факторы блокируют решение о покупке.',
      recommendation: 'Соберите 10-15 отзывов, обоснуйте цену в описании',
    },
    {
      title: 'Формирую план действий',
      thoughts: [
        'Ранжирую проблемы по важности...',
        'Рассчитываю приоритеты...',
        'Определяю сложность правок...',
        'Составляю последовательность действий...',
      ],
      found: 'Готов план из 11 действий с приоритетами',
      why: 'Правильная последовательность ускоряет результат.',
      recommendation: 'Начните с быстрых правок, затем перейдите к сложным',
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

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Укажите email или Telegram');
      return;
    }
    toast.success('Спасибо! Мы напишем вам, когда откроем доступ');
    setShowAccessForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="TrendingUp" size={28} />
            <span className="text-xl font-bold">MIRRO</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-md">
              Demo
            </span>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">
              Получить доступ
            </Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <Card className="p-4 mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Это демонстрационная версия
                </p>
                <p className="text-sm text-blue-700">
                  Показываем, как работает анализ карточек. Данные — условный пример для демонстрации логики сервиса. 
                  Полная версия с реальным анализом доступна по запросу.
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
              Анализатор карточек
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Демо-версия: покажем, как AI проверяет карточку
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
                  <h3 className="text-2xl font-bold">Процесс анализа</h3>
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
                              <p className="text-sm text-foreground">
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
                      Демо-анализ завершён
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Это пример того, как работает анализ. В полной версии — реальные данные и детальный отчёт.
                    </p>
                  </div>

                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 mb-6">
                    <h5 className="text-lg font-bold mb-4">📋 Пример плана действий:</h5>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Заполните недостающие характеристики</p>
                          <p className="text-sm text-muted-foreground">Быстрая правка, влияет на видимость</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Переместите ключи в начало заголовка</p>
                          <p className="text-sm text-muted-foreground">5 минут работы</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Добавьте инфографику на фото</p>
                          <p className="text-sm text-muted-foreground">Влияет на клики</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-blue-50 border-blue-200 mb-6">
                    <div className="text-center">
                      <h5 className="font-bold mb-2">Хотите получить полный анализ своей карточки?</h5>
                      <p className="text-sm text-muted-foreground mb-4">
                        Полная версия с реальными данными, детальным отчётом и планом действий
                      </p>
                      <Button onClick={() => setShowAccessForm(true)}>
                        Запросить доступ
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </Card>
          )}

          {!isAnalyzing && analysisProgress === 0 && (
            <Card className="p-8 text-center mt-8">
              <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-3">Что проверяет анализатор</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6 max-w-2xl mx-auto">
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">SEO карточки</p>
                    <p className="text-sm text-muted-foreground">Заголовок, ключевые слова, характеристики</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Визуал</p>
                    <p className="text-sm text-muted-foreground">Качество фото, инфографика</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Описание</p>
                    <p className="text-sm text-muted-foreground">Структура, полнота</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Стоп-факторы</p>
                    <p className="text-sm text-muted-foreground">Что блокирует покупку</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      <Dialog open={showAccessForm} onOpenChange={setShowAccessForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Запросить доступ</DialogTitle>
            <DialogDescription>
              Сервис в разработке. Мы откроем доступ постепенно и напишем вам, когда будет готово.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRequestAccess} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="email">Email или Telegram *</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com или @username"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="comment">Комментарий (необязательно)</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Что думаете? Что было бы полезно?"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Записаться в лист ожидания
              <Icon name="Send" size={18} className="ml-2" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Без спама. Напишем только когда откроем доступ.
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
              <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-md">
                Demo
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MIRRO. Сервис в разработке.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Analyzer;
