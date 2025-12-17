import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [productUrl, setProductUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    marketplace: 'WB',
    agreedToPolicy: false,
  });

  const analysisStages = [
    {
      title: 'Проверяем заголовок и ключевые слова',
      found: 'Найдено 3 ключевых слова в заголовке',
      why: 'Заголовок — первое, что видит покупатель. Правильные ключи увеличивают показы на 40%.',
      recommendation: 'Добавьте целевые запросы в начало заголовка',
    },
    {
      title: 'Анализируем описание и структуру',
      found: 'Описание заполнено на 60%',
      why: 'Подробное описание снижает возвраты на 25% и повышает доверие покупателя.',
      recommendation: 'Добавьте блоки про материал, размеры и способы применения',
    },
    {
      title: 'Проверяем характеристики и заполненность',
      found: 'Заполнено 8 из 15 обязательных характеристик',
      why: 'Незаполненные поля снижают позиции в поиске и конверсию на 30%.',
      recommendation: 'Заполните все характеристики для выхода в топ выдачи',
    },
    {
      title: 'Оцениваем визуал и обложку',
      found: 'Главное фото соответствует требованиям, но нет инфографики',
      why: 'Карточки с инфографикой получают на 60% больше кликов.',
      recommendation: 'Добавьте схему применения или сравнение на 2-3 фото',
    },
    {
      title: 'Ищем стоп-факторы конверсии',
      found: 'Обнаружено 2 критичных фактора',
      why: 'Стоп-факторы (высокая цена без обоснования, мало отзывов) блокируют покупку.',
      recommendation: 'Добавьте обоснование цены и соберите первые 10 отзывов',
    },
    {
      title: 'Формируем рекомендации и приоритеты',
      found: 'Готов план из 12 действий',
      why: 'Правильная приоритизация даёт результат в 3 раза быстрее.',
      recommendation: 'Начните с быстрых правок — получите +15% к конверсии за неделю',
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

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });

      setCurrentStage((prev) => {
        const newStage = Math.floor((analysisProgress / 100) * analysisStages.length);
        return Math.min(newStage, analysisStages.length - 1);
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
    }, 5000);
  };

  const handleGetFullAnalysis = () => {
    setShowLeadForm(true);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.agreedToPolicy) {
      toast.error('Заполните все обязательные поля и примите условия');
      return;
    }

    setShowLeadForm(false);
    setShowThankYou(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={28} />
            <span className="text-xl font-bold">CardAnalyzer</span>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Mail" size={16} className="mr-2" />
            Контакты
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            AI-анализ карточек<br />для роста продаж
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Находим ошибки и точки роста в карточках маркетплейсов.<br />
            Получите план действий для увеличения конверсии.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
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
              {isAnalyzing ? 'Анализируем...' : 'Проверить карточку'}
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            ⚡ Превью анализа — бесплатно, полный отчёт — для участников листа ожидания
          </p>
        </div>
      </section>

      {(isAnalyzing || analysisProgress > 0) && (
        <section className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto p-8 animate-slide-up">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Анализируем карточку</h3>
                <span className="text-lg font-semibold">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>

            <div className="space-y-6">
              {analysisStages.map((stage, index) => (
                <div
                  key={index}
                  className={`border-l-4 pl-6 py-4 transition-all duration-300 ${
                    index <= currentStage
                      ? 'border-primary opacity-100'
                      : 'border-muted opacity-40'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {index <= currentStage ? (
                      <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0 mt-1" />
                    ) : (
                      <Icon name="Circle" size={24} className="text-muted-foreground flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{stage.title}</h4>
                      {index <= currentStage && (
                        <>
                          <p className="text-sm text-foreground mb-1">
                            <strong>Найдено:</strong> {stage.found}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Почему важно:</strong> {stage.why}
                          </p>
                          <p className="text-sm text-primary font-medium">
                            → {stage.recommendation}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {analysisProgress === 100 && (
              <div className="mt-8 pt-8 border-t text-center">
                <h4 className="text-xl font-bold mb-4">
                  Превью готово! Хотите увидеть полный анализ?
                </h4>
                <Button
                  onClick={handleGetFullAnalysis}
                  size="lg"
                  className="text-lg px-8"
                >
                  Получить полный анализ
                  <Icon name="Sparkles" size={20} className="ml-2" />
                </Button>
              </div>
            )}
          </Card>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Что анализируем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'Type', title: 'Название и ключи', desc: 'SEO-оптимизация заголовка и поисковые запросы' },
              { icon: 'Image', title: 'Фото и визуал', desc: 'Качество, инфографика, соответствие требованиям' },
              { icon: 'FileText', title: 'Описание', desc: 'Структура, полнота, читаемость и убедительность' },
              { icon: 'List', title: 'Характеристики', desc: 'Заполненность обязательных и дополнительных полей' },
              { icon: 'Tag', title: 'Цена и скидки', desc: 'Конкурентность ценообразования и промо-механики' },
              { icon: 'Star', title: 'Отзывы и рейтинг', desc: 'Количество, качество и работа с негативом' },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <Icon name={item.icon} size={32} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Что вы получите</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: 'ClipboardCheck',
                  title: 'Чек-лист ошибок',
                  desc: 'Полный список найденных проблем с критичностью и влиянием на конверсию',
                },
                {
                  icon: 'Lightbulb',
                  title: 'Рекомендации',
                  desc: 'Конкретные советы по исправлению с примерами формулировок и референсами',
                },
                {
                  icon: 'Target',
                  title: 'Приоритеты',
                  desc: 'Ранжированный план действий: что делать сначала, что потом',
                },
                {
                  icon: 'TrendingUp',
                  title: 'Прогноз роста',
                  desc: 'Оценка влияния изменений на конверсию и продажи после правок',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                      <Icon name={item.icon} size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Как это работает</h2>
          <div className="space-y-8">
            {[
              { num: '01', title: 'Вставьте ссылку', desc: 'Скопируйте URL карточки с WB, Ozon или Яндекс.Маркета' },
              { num: '02', title: 'AI анализирует', desc: 'Проверяем 50+ параметров по алгоритмам маркетплейсов' },
              { num: '03', title: 'Получите отчёт', desc: 'Чек-лист ошибок + рекомендации + план действий' },
              { num: '04', title: 'Исправьте и растите', desc: 'Внесите правки и отслеживайте рост конверсии' },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {step.num}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: 'Насколько точен анализ?',
                  a: 'Мы используем проверенные алгоритмы маркетплейсов и данные из 10 000+ успешных карточек. Точность рекомендаций — 85%+.',
                },
                {
                  q: 'Какие маркетплейсы поддерживаете?',
                  a: 'В MVP: Wildberries, Ozon, Яндекс.Маркет. Планируем добавить AliExpress и международные площадки.',
                },
                {
                  q: 'Когда будет готов MVP?',
                  a: 'Запуск первой версии запланирован на Q1 2025. Участники листа ожидания получат ранний доступ.',
                },
                {
                  q: 'Это бесплатно?',
                  a: 'Превью анализа — бесплатно всегда. Полный отчёт будет доступен по подписке от 990₽/мес. Первым 100 пользователям — скидка 50%.',
                },
                {
                  q: 'Как вы свяжетесь со мной?',
                  a: 'Отправим письмо на email или сообщение в Telegram, как только MVP будет готов к тестированию.',
                },
                {
                  q: 'Можно ли анализировать несколько карточек?',
                  a: 'Да, в полной версии вы сможете добавить все свои карточки и отслеживать динамику улучшений.',
                },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto p-12 text-center bg-primary text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Готовы вырастить продажи?</h2>
          <p className="text-xl mb-8 opacity-90">
            Встаньте в лист ожидания и получите ранний доступ к MVP
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8"
            onClick={() => setShowLeadForm(true)}
          >
            Получить доступ
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </Card>
      </section>

      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="TrendingUp" size={24} />
                <span className="text-lg font-bold">CardAnalyzer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-анализ карточек для роста продаж на маркетплейсах
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <p className="text-sm text-muted-foreground mb-2">support@cardanalyzer.ru</p>
              <p className="text-sm text-muted-foreground">+7 (900) 000-00-00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <p className="text-sm text-muted-foreground mb-2">Политика конфиденциальности</p>
              <p className="text-sm text-muted-foreground">Пользовательское соглашение</p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 CardAnalyzer. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Получить полный анализ</DialogTitle>
            <DialogDescription>
              Оставьте контакты — пришлём доступ к MVP и полный отчёт по вашей карточке
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitLead} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ваше имя"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон / Telegram</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (900) 000-00-00 или @username"
              />
            </div>
            <div>
              <Label htmlFor="marketplace">Маркетплейс</Label>
              <select
                id="marketplace"
                value={formData.marketplace}
                onChange={(e) => setFormData({ ...formData, marketplace: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="WB">Wildberries</option>
                <option value="Ozon">Ozon</option>
                <option value="Yandex">Яндекс.Маркет</option>
                <option value="Other">Другой</option>
              </select>
            </div>
            {productUrl && (
              <div>
                <Label>Ссылка на карточку</Label>
                <Input value={productUrl} disabled className="bg-muted" />
              </div>
            )}
            <div className="flex items-start gap-2">
              <Checkbox
                id="policy"
                checked={formData.agreedToPolicy}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreedToPolicy: checked === true })
                }
              />
              <label htmlFor="policy" className="text-sm text-muted-foreground leading-tight">
                Я соглашаюсь с политикой конфиденциальности и обработкой персональных данных
              </label>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Встать в лист ожидания
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
            <Icon name="Check" size={32} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl">Вы в листе ожидания! 🎉</DialogTitle>
            <DialogDescription className="text-base mt-4">
              Мы отправим вам полный анализ и приглашение в MVP на указанный email.
              <br />
              <br />
              <strong>Ориентировочный срок:</strong> Q1 2025
              <br />
              <br />
              Следите за обновлениями — первым 100 пользователям скидка 50% на подписку!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowThankYou(false)} className="mt-4" size="lg">
            Отлично!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
