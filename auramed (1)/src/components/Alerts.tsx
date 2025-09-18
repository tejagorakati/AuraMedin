import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, MapPin, Activity, TrendingUp, Users } from "lucide-react";
import { useData } from "./DataContext";

// Northeast India districts coordinates (simplified for demo)
const districtData = [
  { name: 'kamrup', displayName: 'Kamrup', x: 150, y: 200 },
  { name: 'guwahati', displayName: 'Guwahati', x: 180, y: 180 },
  { name: 'dibrugarh', displayName: 'Dibrugarh', x: 300, y: 150 },
  { name: 'silchar', displayName: 'Silchar', x: 200, y: 300 },
  { name: 'tezpur', displayName: 'Tezpur', x: 170, y: 140 },
  { name: 'jorhat', displayName: 'Jorhat', x: 250, y: 160 },
  { name: 'nagaon', displayName: 'Nagaon', x: 200, y: 200 },
];

export function Alerts() {
  const { getDistrictCases, getDistrictRiskLevel, communityMembers, translate } = useData();
  
  const districtCases = getDistrictCases();
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return '#dc2626'; // Red
      case 'high': return '#ea580c'; // Orange  
      case 'moderate': return '#ca8a04'; // Yellow
      case 'low': return '#16a34a'; // Green
      default: return '#e5e7eb'; // Light gray
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-black border-red-200';
      case 'high': return 'bg-black border-orange-200'; 
      case 'moderate': return 'bg-black border-yellow-200';
      case 'low': return 'bg-black border-green-200';
      default: return 'bg-black border-gray-200';
    }
  };

  const totalCases = Object.values(districtCases).reduce((sum, cases) => sum + cases, 0);
  const criticalDistricts = Object.entries(districtCases).filter(([_, cases]) => cases > 20).length;
  const highRiskDistricts = Object.entries(districtCases).filter(([_, cases]) => cases > 10 && cases <= 20).length;

  return (
    <section id="alerts" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {translate('alerts.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {translate('alerts.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {translate('alerts.subtitle')}
          </p>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{translate('alerts.total_cases')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCases}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Across all {translate('alerts.districts')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700">{translate('alerts.risk.critical')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalDistricts}</div>
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {translate('alerts.districts')} {'>'}20 {translate('alerts.cases')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">{translate('alerts.risk.high')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{highRiskDistricts}</div>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {translate('alerts.districts')} 11-20 {translate('alerts.cases')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{translate('dashboard.contributors')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityMembers.length}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                Active reporters
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Disease Risk Map */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {translate('alerts.map.title')}
                </CardTitle>
                <CardDescription>
                  Interactive map showing disease risk levels across Northeast India districts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-white rounded-lg border p-8 min-h-[400px]">
                  {/* Map SVG */}
                  <svg viewBox="0 0 400 350" className="w-full h-full">
                    {/* Background map outline (simplified Northeast India) */}
                    <path
                      d="M50 80 L350 80 L350 180 L320 220 L300 280 L250 320 L150 320 L100 280 L80 220 L50 180 Z"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    
                    {/* District markers */}
                    {districtData.map((district) => {
                      const cases = districtCases[district.name] || 0;
                      const riskLevel = getDistrictRiskLevel(cases);
                      const color = getRiskColor(riskLevel);
                      
                      return (
                        <g key={district.name}>
                          {/* District circle */}
                          <circle
                            cx={district.x}
                            cy={district.y}
                            r="20"
                            fill={color}
                            stroke="white"
                            strokeWidth="3"
                            className="drop-shadow-lg cursor-pointer hover:scale-110 transition-transform"
                          />
                          {/* Cases count */}
                          <text
                            x={district.x}
                            y={district.y + 4}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {cases}
                          </text>
                          {/* District name */}
                          <text
                            x={district.x}
                            y={district.y + 35}
                            textAnchor="middle"
                            fill="#374151"
                            fontSize="10"
                            fontWeight="500"
                          >
                            {district.displayName}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border">
                    <h4 className="font-semibold text-sm mb-2">Risk Levels</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <span>{translate('alerts.risk.critical')} ({'>'}20 {translate('alerts.cases')})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                        <span>{translate('alerts.risk.high')} (11-20 {translate('alerts.cases')})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                        <span>{translate('alerts.risk.moderate')} (6-10 {translate('alerts.cases')})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <span>{translate('alerts.risk.low')} ({'≤'}5 {translate('alerts.cases')})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* District Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{translate('alerts.district_status')}</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {districtData.map((district) => {
                const cases = districtCases[district.name] || 0;
                const riskLevel = getDistrictRiskLevel(cases);
                const bgClass = getRiskBg(riskLevel);
                
                return (
                  <Card key={district.name} className={`${bgClass} transition-all hover:shadow-md`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{district.displayName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${
                              riskLevel === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                              riskLevel === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                              riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-green-100 text-green-800 border-green-200'
                            }`}>
                              {translate(`alerts.risk.${riskLevel}`)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{cases}</div>
                          <div className="text-xs text-gray-400">{translate('alerts.cases')}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* SMS Alert Buttons */}  
        <div className="flex gap-4 justify-center mt-8 mb-8">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
            onClick={() => {
              // Mock SMS sending functionality
              alert('SMS sent to all red alert zones!');
            }}
          >
            {translate('alerts.sms.red')}
          </Button>
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
            onClick={() => {
              // Mock SMS sending functionality
              alert('SMS sent to all orange alert zones!');
            }}
          >
            {translate('alerts.sms.orange')}
          </Button>
        </div>

        {/* Alert Guidelines */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Alert System Guidelines</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• <strong>Critical Risk (Red):</strong> {'>'}20 cases - Immediate intervention required</li>
                  <li>• <strong>High Risk (Orange):</strong> 11-20 cases - Enhanced surveillance needed</li>
                  <li>• <strong>Moderate Risk (Yellow):</strong> 6-10 cases - Increased monitoring</li>
                  <li>• <strong>Low Risk (Green):</strong> {'≤'}5 cases - Routine surveillance</li>
                  <li>• Data updates in real-time based on community health worker reports</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}