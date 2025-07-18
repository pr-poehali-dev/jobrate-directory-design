import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

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

  // Данные для графиков зарплат
  const salaryByPositionData = [
    { position: 'Junior Dev', salary: 80000, count: 145 },
    { position: 'Middle Dev', salary: 150000, count: 89 },
    { position: 'Senior Dev', salary: 250000, count: 67 },
    { position: 'Tech Lead', salary: 350000, count: 34 },
    { position: 'PM', salary: 180000, count: 56 },
    { position: 'QA', salary: 120000, count: 78 },
    { position: 'DevOps', salary: 200000, count: 45 },
    { position: 'Data Scientist', salary: 220000, count: 38 }
  ];

  const salaryTrendData = [
    { year: 2020, salary: 120000 },
    { year: 2021, salary: 135000 },
    { year: 2022, salary: 160000 },
    { year: 2023, salary: 185000 },
    { year: 2024, salary: 210000 }
  ];

  const industryDistributionData = [
    { name: 'IT', value: 35, color: '#3b82f6' },
    { name: 'Финансы', value: 25, color: '#10b981' },
    { name: 'Торговля', value: 15, color: '#f59e0b' },
    { name: 'Производство', value: 12, color: '#ef4444' },
    { name: 'Другое', value: 13, color: '#8b5cf6' }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Icon name="Building2" className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">JobRate</h1>
            </motion.div>
            <nav className="flex space-x-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#" 
                className="text-primary font-medium"
              >
                Компании
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#" 
                className="text-gray-600 hover:text-gray-900"
              >
                Отзывы
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#" 
                className="text-gray-600 hover:text-gray-900"
              >
                Вакансии
              </motion.a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог компаний-работодателей</h1>
          <p className="text-gray-600">Найдите информацию о работодателях, читайте отзывы сотрудников и узнавайте о зарплатах</p>
        </motion.div>

        {/* Tabs для навигации */}
        <Tabs defaultValue="companies" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="companies">Компании</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика зарплат</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="space-y-8">

            {/* Search and Filters */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button className="w-full">
                  <Icon name="Search" className="w-4 h-4 mr-2" />
                  Найти
                </Button>
              </motion.div>
            </div>
          </div>
            </motion.div>

            {/* Sort Options */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between items-center"
            >
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
            </motion.div>

            {/* Companies Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl"
                    >
                      {company.logo}
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="secondary" className="mt-1">
                          {company.industry}
                        </Badge>
                      </motion.div>
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
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="w-full mt-4">
                    Подробнее
                  </Button>
                </motion.div>
              </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <div className="flex space-x-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="sm">
                    <Icon name="ChevronLeft" className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="sm">2</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="sm">3</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="sm">
                    <Icon name="ChevronRight" className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Salary Analytics */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Зарплаты по позициям */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BarChart3" className="w-5 h-5" />
                    <span>Зарплаты по позициям</span>
                  </CardTitle>
                  <CardDescription>Средние зарплаты в IT сфере</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={salaryByPositionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="position" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={12}
                        />
                        <YAxis 
                          tickFormatter={(value) => `${value/1000}k`}
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()} ₽`, 'Зарплата']}
                          labelFormatter={(label) => `Позиция: ${label}`}
                        />
                        <Bar 
                          dataKey="salary" 
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Тренд зарплат */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="TrendingUp" className="w-5 h-5" />
                    <span>Тренд зарплат</span>
                  </CardTitle>
                  <CardDescription>Рост зарплат за последние 5 лет</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <LineChart data={salaryTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis 
                          tickFormatter={(value) => `${value/1000}k`}
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()} ₽`, 'Средняя зарплата']}
                          labelFormatter={(label) => `Год: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="salary" 
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Распределение по отраслям */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="PieChart" className="w-5 h-5" />
                    <span>Распределение по отраслям</span>
                  </CardTitle>
                  <CardDescription>Процентное соотношение компаний по отраслям</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={industryDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {industryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Доля']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Статистика */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Activity" className="w-5 h-5" />
                    <span>Статистика платформы</span>
                  </CardTitle>
                  <CardDescription>Основные показатели JobRate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Building2" className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Компаний</p>
                        <p className="text-2xl font-bold text-blue-600">50,000+</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="MessageSquare" className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Отзывов</p>
                        <p className="text-2xl font-bold text-green-600">500,000+</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Users" className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Пользователей</p>
                        <p className="text-2xl font-bold text-orange-600">1,000,000+</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* SEO Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white rounded-lg shadow-sm border p-8"
        >
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
        </motion.div>
      </main>
    </div>
  );
};

export default Index;