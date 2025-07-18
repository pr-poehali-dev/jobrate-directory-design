import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const industries = [
    'IT и технологии',
    'Финансы',
    'Розничная торговля',
    'Металлургия',
    'Образование',
    'Здравоохранение',
    'Производство',
    'Транспорт и логистика'
  ];

  const cities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Нижний Новгород',
    'Казань',
    'Самара',
    'Омск'
  ];

  const companies = [
    {
      id: 1,
      name: 'Яндекс',
      industry: 'IT и технологии',
      city: 'Москва',
      rating: 4.3,
      reviewCount: 1247,
      logo: '🔍',
      description: 'Технологическая компания'
    },
    {
      id: 2,
      name: 'Сбербанк',
      industry: 'Финансы',
      city: 'Москва',
      rating: 3.8,
      reviewCount: 2156,
      logo: '🏦',
      description: 'Крупнейший банк России'
    },
    {
      id: 3,
      name: 'OZON',
      industry: 'Розничная торговля',
      city: 'Москва',
      rating: 4.1,
      reviewCount: 892,
      logo: '🛒',
      description: 'Интернет-магазин'
    },
    {
      id: 4,
      name: 'Газпром',
      industry: 'Производство',
      city: 'Санкт-Петербург',
      rating: 3.9,
      reviewCount: 1543,
      logo: '⚡',
      description: 'Энергетическая компания'
    },
    {
      id: 5,
      name: 'Тинькофф',
      industry: 'Финансы',
      city: 'Москва',
      rating: 4.5,
      reviewCount: 1098,
      logo: '💳',
      description: 'Цифровой банк'
    },
    {
      id: 6,
      name: 'ВТБ',
      industry: 'Финансы',
      city: 'Москва',
      rating: 3.7,
      reviewCount: 1876,
      logo: '🏛️',
      description: 'Банк с госучастием'
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    const matchesCity = !selectedCity || company.city === selectedCity;
    
    return matchesSearch && matchesIndustry && matchesCity;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">JobRate</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-primary font-medium">Компании</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Отзывы</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Вакансии</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог компаний-работодателей</h1>
          <p className="text-gray-600">Найдите информацию о работодателях, читайте отзывы сотрудников и узнавайте о зарплатах</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск компании</label>
              <Input
                placeholder="Название компании..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Отрасль</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите отрасль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все отрасли</SelectItem>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Город</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все города</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full">
                <Icon name="Search" className="w-4 h-4 mr-2" />
                Найти
              </Button>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Найдено компаний: {filteredCompanies.length}</p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="reviews">По количеству отзывов</SelectItem>
              <SelectItem value="alphabetical">По алфавиту</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCompanies.map(company => (
            <Card key={company.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {company.logo}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {company.industry}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">
                  {company.description}
                </CardDescription>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(company.rating)}
                  </div>
                  <span className="font-medium">{company.rating}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{company.reviewCount} отзывов</span>
                  <span className="flex items-center">
                    <Icon name="MapPin" className="w-4 h-4 mr-1" />
                    {company.city}
                  </span>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="ChevronLeft" className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <Icon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* SEO Text */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">О каталоге работодателей JobRate</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              JobRate — это крупнейшая платформа отзывов о работодателях в России. Мы собрали информацию о более чем 50 000 компаний 
              из различных отраслей: IT и технологии, финансы, розничная торговля, металлургия, образование, здравоохранение, 
              производство, транспорт и логистика.
            </p>
            <p className="text-gray-600 mb-4">
              На нашей платформе вы найдете честные отзывы сотрудников о работодателях, информацию о зарплатах, условиях работы, 
              корпоративной культуре и возможностях карьерного роста. Более 500 000 пользователей доверяют JobRate при выборе места работы.
            </p>
            <p className="text-gray-600">
              Используйте удобные фильтры для поиска компаний по отрасли и городу. Читайте отзывы, сравнивайте рейтинги и принимайте 
              взвешенные решения о своей карьере. JobRate помогает найти идеального работодателя в Москве, Санкт-Петербурге, 
              Новосибирске, Екатеринбурге и других городах России.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;