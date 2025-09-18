import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, Users, Droplets, AlertTriangle, TrendingUp, Download } from "lucide-react";
import { useData } from "./DataContext";

export function NewDashboard() {
  const { 
    patientData, 
    waterQualityData, 
    communityMembers, 
    getChartData,
    translate,
    exportToCSV 
  } = useData();
  
  const { waterQuality, patientDisease, diseaseRate } = getChartData();

  const stats = [
    {
      title: translate('dashboard.patients'),
      value: patientData.length.toString(),
      icon: Users,
      trend: "+12% from last month"
    },
    {
      title: translate('dashboard.watersamples'),
      value: waterQualityData.length.toString(),
      icon: Droplets,
      trend: "+8% from last month"
    },
    {
      title: translate('dashboard.contributors'),
      value: communityMembers.length.toString(),
      icon: Activity,
      trend: "+3 new this week"
    },
    {
      title: translate('dashboard.alerts'),
      value: "0",
      icon: AlertTriangle,
      trend: "No active alerts"
    }
  ];

  const handleExportCSV = async (type: 'patient' | 'water' | 'community') => {
    try {
      await exportToCSV(type);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <Activity className="w-3 h-3 mr-1" />
            {translate('dashboard.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {translate('dashboard.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translate('dashboard.subtitle')}
          </p>
        </div>

        {/* CSV Export Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button 
            onClick={() => handleExportCSV('patient')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {translate('csv.export')} - {translate('csv.patient_data')}
          </Button>
          <Button 
            onClick={() => handleExportCSV('water')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {translate('csv.export')} - {translate('csv.water_data')}
          </Button>
          <Button 
            onClick={() => handleExportCSV('community')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {translate('csv.export')} - Community Data
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Water Quality Distribution */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                {translate('dashboard.waterquality')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={waterQuality}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {waterQuality.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Disease Trends */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                {translate('dashboard.diseasetrends')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={patientDisease}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="disease" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Disease Rate */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              {translate('dashboard.monthly')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={diseaseRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}