import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Users, UserPlus, Activity, MapPin, Stethoscope, Building2 } from "lucide-react";
import { useState } from "react";
import { useData } from "./DataContext";

export function Community() {
  const { communityMembers, addCommunityMember, translate } = useData();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    village: "",
    district: "",
    casesUpdated: ""
  });

  const handleSubmit = () => {
    if (formData.name && formData.role && formData.village && formData.district) {
      addCommunityMember({
        id: crypto.randomUUID(),
        name: formData.name,
        role: formData.role as 'asha' | 'doctor' | 'clinic',
        village: formData.village,
        district: formData.district,
        casesUpdated: parseInt(formData.casesUpdated) || 0,
        timestamp: new Date(),
      });
      
      setFormData({
        name: "",
        role: "",
        village: "",
        district: "",
        casesUpdated: ""
      });
      
      alert("Successfully joined the community network!");
    } else {
      alert("Please fill all required fields.");
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'asha': return Users;
      case 'doctor': return Stethoscope;
      case 'clinic': return Building2;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'asha': return 'bg-green-100 text-green-800 border-green-200';
      case 'doctor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'clinic': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="community" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
            <Users className="w-3 h-3 mr-1" />
            {translate('community.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {translate('community.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translate('community.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Join Network Form */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600" />
                {translate('community.joinnetwork')}
              </CardTitle>
              <CardDescription>
                Register as a healthcare contributor in your community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contrib-name">{translate('community.name')} *</Label>
                <Input 
                  id="contrib-name" 
                  placeholder={translate('placeholder.enter_your_name')}
                  className="bg-card border-border"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrib-role">{translate('community.role')} *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder={translate('placeholder.select_role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asha">{translate('community.asha')}</SelectItem>
                    <SelectItem value="doctor">{translate('community.doctor')}</SelectItem>
                    <SelectItem value="clinic">{translate('community.clinic')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contrib-village">{translate('form.village')} *</Label>
                  <Input 
                    id="contrib-village" 
                    placeholder={translate('placeholder.village_name')}
                    className="bg-card border-border"
                    value={formData.village}
                    onChange={(e) => setFormData({...formData, village: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrib-district">{translate('form.district')} *</Label>
                  <Select value={formData.district} onValueChange={(value) => setFormData({...formData, district: value})}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder={translate('placeholder.select_district')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kamrup">Kamrup</SelectItem>
                      <SelectItem value="guwahati">Guwahati</SelectItem>
                      <SelectItem value="dibrugarh">Dibrugarh</SelectItem>
                      <SelectItem value="silchar">Silchar</SelectItem>
                      <SelectItem value="tezpur">Tezpur</SelectItem>
                      <SelectItem value="jorhat">Jorhat</SelectItem>
                      <SelectItem value="nagaon">Nagaon</SelectItem>
                      <SelectItem value="other">{translate('form.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cases-updated">{translate('community.cases')}</Label>
                <Input 
                  id="cases-updated" 
                  type="number"
                  placeholder={translate('placeholder.number_of_cases')}
                  className="bg-card border-border"
                  value={formData.casesUpdated}
                  onChange={(e) => setFormData({...formData, casesUpdated: e.target.value})}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700">
                {translate('community.join')}
              </Button>
            </CardContent>
          </Card>

          {/* Community Members */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{translate('dashboard.contributors')}</h3>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {communityMembers.length} Members
              </Badge>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {communityMembers.length === 0 ? (
                <Card className="bg-card/30 border-dashed border-2">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No community members yet. Be the first to join!</p>
                  </CardContent>
                </Card>
              ) : (
                communityMembers.map((member) => {
                  const IconComponent = getRoleIcon(member.role);
                  return (
                    <Card key={member.id} className="bg-card/50 border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <IconComponent className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{member.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getRoleColor(member.role)}>
                                  {translate(`community.${member.role}`)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                                <MapPin className="w-3 h-3" />
                                {member.village}, {member.district}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{translate('community.cases')}</div>
                            <div className="text-lg font-semibold text-blue-600">{member.casesUpdated}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {communityMembers.filter(m => m.role === 'asha').length}
              </div>
              <div className="text-sm text-muted-foreground">{translate('community.asha')}s</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200">
            <CardContent className="p-6 text-center">
              <Stethoscope className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {communityMembers.filter(m => m.role === 'doctor').length}
              </div>
              <div className="text-sm text-muted-foreground">{translate('community.doctor')}s</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-200">
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {communityMembers.filter(m => m.role === 'clinic').length}
              </div>
              <div className="text-sm text-muted-foreground">{translate('community.clinic')}s</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}