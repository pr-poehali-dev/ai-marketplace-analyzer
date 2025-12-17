import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Analyzer = () => {
  const [productUrl, setProductUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Анализатор карточек
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Проверьте карточку товара и получите рекомендации по улучшению
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
                {isAnalyzing ? 'Анализируем...' : 'Проверить'}
                <Icon name="Search" size={20} className="ml-2" />
              </Button>
            </div>
          </div>

          {(isAnalyzing || analysisProgress > 0) && (
            <Card className="p-8 animate-fade-in">
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
                    <div className="flex items-start gap-3">
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
                    Анализ завершён!
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Хотите получить полный отчёт с детальными рекомендациями?
                  </p>
                  <Button size="lg">
                    Получить полный отчёт
                    <Icon name="Download" size={20} className="ml-2" />
                  </Button>
                </div>
              )}
            </Card>
          )}
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

export default Analyzer;
