import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  UserPlus, 
  Droplets, 
  Calendar,
  MapPin,
  Thermometer,
  Activity,
  AlertCircle,
  Save,
  FileText,
  Trash2,
  User
} from "lucide-react";
import { useState } from "react";
import { useData } from "./DataContext";

const symptoms = [
  { id: "vomit", label: "symptom.vomit" },
  { id: "fever", label: "symptom.fever" },
  { id: "diarrhea", label: "symptom.diarrhea" },
  { id: "nausea", label: "symptom.nausea" },
  { id: "shortness_breath", label: "symptom.shortness_breath" },
  { id: "stomach_pain", label: "symptom.stomach_pain" },
  { id: "weight_loss", label: "symptom.weight_loss" }
];

export function DataEntry() {
  const { 
    addPatientData, 
    addWaterQualityData, 
    addPatientDraft, 
    addWaterQualityDraft, 
    patientDrafts,
    waterQualityDrafts,
    deletePatientDraft,
    deleteWaterQualityDraft,
    translate 
  } = useData();
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    village: "",
    district: "",
    daysOfSymptoms: "",
    primaryWaterSource: ""
  });
  const [waterSourceData, setWaterSourceData] = useState({
    location: "",
    village: "",
    district: "",
    state: "",
    sourceType: "",
    quality: "",
    temperature: "",
    pH: "",
    turbidity: "",
    tds: "",
    bacteriaCount: "0"
  });

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    }
  };

  const handlePatientSubmit = () => {
    if (patientData.name && patientData.age && patientData.village && patientData.district && selectedSymptoms.length > 0) {
      addPatientData({
        id: crypto.randomUUID(),
        name: patientData.name,
        age: parseInt(patientData.age),
        gender: patientData.gender,
        dob: patientData.dob,
        village: patientData.village,
        district: patientData.district,
        symptoms: selectedSymptoms,
        daysOfSymptoms: parseInt(patientData.daysOfSymptoms) || 1,
        primaryWaterSource: patientData.primaryWaterSource,
        timestamp: new Date(),
      });
      
      // Reset form
      setPatientData({
        name: "",
        age: "",
        gender: "",
        dob: "",
        village: "",
        district: "",
        daysOfSymptoms: "",
        primaryWaterSource: ""
      });
      setSelectedSymptoms([]);
      
      alert("Patient data submitted successfully!");
    } else {
      alert("Please fill all required fields including village and district.");
    }
  };

  const handlePatientDraft = () => {
    addPatientDraft({
      id: crypto.randomUUID(),
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      dob: patientData.dob,
      village: patientData.village,
      district: patientData.district,
      symptoms: selectedSymptoms,
      daysOfSymptoms: patientData.daysOfSymptoms,
      primaryWaterSource: patientData.primaryWaterSource,
      timestamp: new Date(),
    });
    alert("Patient data saved as draft!");
  };

  const handleWaterQualitySubmit = () => {
    if (waterSourceData.location && waterSourceData.village && waterSourceData.district && waterSourceData.state && 
        waterSourceData.temperature && waterSourceData.tds && waterSourceData.pH && waterSourceData.turbidity) {
      addWaterQualityData({
        id: crypto.randomUUID(),
        location: waterSourceData.location,
        village: waterSourceData.village,
        district: waterSourceData.district,
        state: waterSourceData.state,
        temperature: parseFloat(waterSourceData.temperature) || 0,
        tdsValue: parseInt(waterSourceData.tds) || 0,
        phLevel: parseFloat(waterSourceData.pH) || 7.0,
        turbidity: parseFloat(waterSourceData.turbidity) || 0,
        bacteriaCount: parseInt(waterSourceData.bacteriaCount) || 0,
        timestamp: new Date(),
      });
      
      // Reset form
      setWaterSourceData({
        location: "",
        village: "",
        district: "",
        state: "",
        sourceType: "",
        quality: "",
        temperature: "",
        pH: "",
        turbidity: "",
        tds: "",
        bacteriaCount: "0"
      });
      
      alert("Water quality data submitted successfully!");
    } else {
      alert("Please fill all required fields including location, village, district, state, temperature, TDS, pH, and turbidity.");
    }
  };

  const handleWaterQualityDraft = () => {
    addWaterQualityDraft({
      id: crypto.randomUUID(),
      location: waterSourceData.location,
      village: waterSourceData.village,
      district: waterSourceData.district,
      state: waterSourceData.state,
      temperature: waterSourceData.temperature,
      pH: waterSourceData.pH,
      turbidity: waterSourceData.turbidity,
      tds: waterSourceData.tds,
      sourceType: waterSourceData.sourceType,
      quality: waterSourceData.quality,
      timestamp: new Date(),
    });
    alert("Water quality data saved as draft!");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <section id="data-entry" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            {translate('dataentry.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {translate('dataentry.title')}
            <br />
            <span className="text-green-600">{translate('dataentry.subtitle')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translate('dataentry.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                {translate('dataentry.patient')}
              </TabsTrigger>
              <TabsTrigger value="water-quality" className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                {translate('dataentry.waterquality')}
              </TabsTrigger>
            </TabsList>

            {/* Patient Data Entry */}
            <TabsContent value="patient">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    {translate('dataentry.patient.title')}
                  </CardTitle>
                  <CardDescription>
                    {translate('dataentry.patient.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">{translate('form.name')} *</Label>
                      <Input 
                        id="patient-name" 
                        placeholder={translate('placeholder.name')}
                        className="bg-card border-border"
                        value={patientData.name}
                        onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-age">{translate('form.age')} *</Label>
                      <Input 
                        id="patient-age" 
                        type="number" 
                        placeholder={translate('placeholder.age')}
                        className="bg-card border-border"
                        value={patientData.age}
                        onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-gender">{translate('form.gender')} *</Label>
                      <Select value={patientData.gender} onValueChange={(value) => setPatientData({...patientData, gender: value})}>
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue placeholder={translate('placeholder.select_gender')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{translate('form.male')}</SelectItem>
                          <SelectItem value="female">{translate('form.female')}</SelectItem>
                          <SelectItem value="other">{translate('form.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-dob">{translate('form.dob')} *</Label>
                      <Input 
                        id="patient-dob" 
                        type="date"
                        className="bg-card border-border"
                        value={patientData.dob}
                        onChange={(e) => setPatientData({...patientData, dob: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="village">{translate('form.village')} *</Label>
                      <Input 
                        id="village" 
                        placeholder={translate('placeholder.village')}
                        className="bg-card border-border"
                        value={patientData.village}
                        onChange={(e) => setPatientData({...patientData, village: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">{translate('form.district')} *</Label>
                      <Select value={patientData.district} onValueChange={(value) => setPatientData({...patientData, district: value})}>
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

                  {/* Symptoms */}
                  <div className="space-y-4">
                    <Label className="text-base">{translate('form.symptoms')} *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {symptoms.map((symptom) => (
                        <div key={symptom.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={(checked) => 
                              handleSymptomChange(symptom.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={symptom.id} 
                            className="text-sm font-normal cursor-pointer"
                          >
                            {translate(symptom.label)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration of Symptoms */}
                  <div className="space-y-2">
                    <Label htmlFor="symptom-days">{translate('form.days')} *</Label>
                    <Input 
                      id="symptom-days" 
                      type="number" 
                      placeholder={translate('placeholder.days')}
                      className="bg-card border-border max-w-xs"
                      value={patientData.daysOfSymptoms}
                      onChange={(e) => setPatientData({...patientData, daysOfSymptoms: e.target.value})}
                    />
                  </div>

                  {/* Water Source */}
                  <div className="space-y-2">
                    <Label htmlFor="water-source">{translate('form.watersource')}</Label>
                    <Select value={patientData.primaryWaterSource} onValueChange={(value) => setPatientData({...patientData, primaryWaterSource: value})}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder={translate('placeholder.select_watersource')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="well">{translate('watersource.well')}</SelectItem>
                        <SelectItem value="river">{translate('watersource.river')}</SelectItem>
                        <SelectItem value="pond">{translate('watersource.pond')}</SelectItem>
                        <SelectItem value="tap">{translate('watersource.tap')}</SelectItem>
                        <SelectItem value="tube-well">{translate('watersource.tubewell')}</SelectItem>
                        <SelectItem value="other">{translate('form.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handlePatientSubmit} className="bg-green-600 hover:bg-green-700">
                      {translate('button.submit')}
                    </Button>
                    <Button variant="outline" onClick={handlePatientDraft}>
                      <Save className="w-4 h-4 mr-2" />
                      {translate('button.draft')}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          {translate('button.viewdrafts')} ({patientDrafts.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{translate('button.viewdrafts')} - {translate('dataentry.patient')}</DialogTitle>
                          <DialogDescription>
                            View and manage your saved patient data drafts
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {patientDrafts.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              No patient drafts saved yet.
                            </div>
                          ) : (
                            patientDrafts.map((draft) => (
                              <Card key={draft.id} className="bg-card/50 border-border/50">
                                <CardHeader>
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <CardTitle className="flex items-center gap-2 text-base">
                                        <User className="w-4 h-4 text-blue-600" />
                                        {draft.name || 'Unnamed Patient'}
                                      </CardTitle>
                                      <CardDescription className="text-sm">
                                        {formatDate(draft.timestamp)} • {draft.village}, {draft.district}
                                      </CardDescription>
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deletePatientDraft(draft.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>Age: {draft.age || 'Not specified'}</div>
                                    <div>Gender: {draft.gender || 'Not specified'}</div>
                                    <div>Days of Symptoms: {draft.daysOfSymptoms || 'Not specified'}</div>
                                    <div>Water Source: {draft.primaryWaterSource || 'Not specified'}</div>
                                  </div>
                                  {draft.symptoms.length > 0 && (
                                    <div className="mt-2">
                                      <div className="text-sm text-muted-foreground">Symptoms:</div>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {draft.symptoms.map((symptom, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {symptom}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Water Quality Analysis */}
            <TabsContent value="water-quality">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    {translate('dataentry.water.title')}
                  </CardTitle>
                  <CardDescription>
                    {translate('dataentry.water.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="water-village">{translate('water.village')} *</Label>
                      <Input 
                        id="water-village" 
                        placeholder={translate('placeholder.village')}
                        className="bg-card border-border"
                        value={waterSourceData.village}
                        onChange={(e) => setWaterSourceData({...waterSourceData, village: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water-district">{translate('water.district')} *</Label>
                      <Input 
                        id="water-district" 
                        placeholder={translate('placeholder.enter_district_name')}
                        className="bg-card border-border"
                        value={waterSourceData.district}
                        onChange={(e) => setWaterSourceData({...waterSourceData, district: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="water-state">{translate('water.state')} *</Label>
                    <Select value={waterSourceData.state} onValueChange={(value) => setWaterSourceData({...waterSourceData, state: value})}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder={translate('placeholder.select_northeast_state')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assam">Assam</SelectItem>
                        <SelectItem value="arunachal-pradesh">Arunachal Pradesh</SelectItem>
                        <SelectItem value="manipur">Manipur</SelectItem>
                        <SelectItem value="meghalaya">Meghalaya</SelectItem>
                        <SelectItem value="mizoram">Mizoram</SelectItem>
                        <SelectItem value="nagaland">Nagaland</SelectItem>
                        <SelectItem value="sikkim">Sikkim</SelectItem>
                        <SelectItem value="tripura">Tripura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="source-location">{translate('water.location')} *</Label>
                    <Input 
                      id="source-location" 
                      placeholder={translate('placeholder.enter_location')}
                      className="bg-card border-border"
                      value={waterSourceData.location}
                      onChange={(e) => setWaterSourceData({...waterSourceData, location: e.target.value})}
                    />
                  </div>

                  {/* Water Quality Parameters */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      {translate('water.quality.measurements')}
                    </h4>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="water-temp">{translate('water.temperature')} *</Label>
                        <Input 
                          id="water-temp" 
                          type="number" 
                          placeholder="e.g., 25.5"
                          className="bg-card border-border"
                          value={waterSourceData.temperature}
                          onChange={(e) => setWaterSourceData({...waterSourceData, temperature: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tds">{translate('water.tds')} *</Label>
                        <Input 
                          id="tds" 
                          type="number" 
                          placeholder="e.g., 150"
                          className="bg-card border-border"
                          value={waterSourceData.tds || ""}
                          onChange={(e) => setWaterSourceData({...waterSourceData, tds: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="water-ph">{translate('water.ph')} *</Label>
                        <Input 
                          id="water-ph" 
                          type="number" 
                          step="0.1"
                          placeholder="e.g., 7.2"
                          className="bg-card border-border"
                          value={waterSourceData.pH}
                          onChange={(e) => setWaterSourceData({...waterSourceData, pH: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="turbidity">{translate('water.turbidity')} *</Label>
                        <Input 
                          id="turbidity" 
                          type="number" 
                          placeholder="e.g., 5.0"
                          className="bg-card border-border"
                          value={waterSourceData.turbidity}
                          onChange={(e) => setWaterSourceData({...waterSourceData, turbidity: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source-type">{translate('water.source.type')} *</Label>
                    <Select value={waterSourceData.sourceType} onValueChange={(value) => setWaterSourceData({...waterSourceData, sourceType: value})}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder={translate('placeholder.select_source_type')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deep-well">{translate('watersource.deepwell')}</SelectItem>
                        <SelectItem value="shallow-well">{translate('watersource.shallowwell')}</SelectItem>
                        <SelectItem value="river">{translate('watersource.river')}</SelectItem>
                        <SelectItem value="pond">{translate('watersource.pond')}</SelectItem>
                        <SelectItem value="lake">{translate('watersource.lake')}</SelectItem>
                        <SelectItem value="spring">{translate('watersource.spring')}</SelectItem>
                        <SelectItem value="tap">{translate('watersource.municipal')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Visual Assessment */}
                  <div className="space-y-2">
                    <Label htmlFor="water-quality">{translate('water.quality.assessment')}</Label>
                    <Select value={waterSourceData.quality} onValueChange={(value) => setWaterSourceData({...waterSourceData, quality: value})}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder={translate('placeholder.select_quality')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clear">{translate('water.quality.clear')}</SelectItem>
                        <SelectItem value="slightly-turbid">{translate('water.quality.slightly_turbid')}</SelectItem>
                        <SelectItem value="turbid">{translate('water.quality.turbid')}</SelectItem>
                        <SelectItem value="colored">{translate('water.quality.colored')}</SelectItem>
                        <SelectItem value="contaminated">{translate('water.quality.contaminated')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleWaterQualitySubmit} className="bg-blue-600 hover:bg-blue-700">
                      {translate('button.submitwater')}
                    </Button>
                    <Button variant="outline" onClick={handleWaterQualityDraft}>
                      <Save className="w-4 h-4 mr-2" />
                      {translate('button.draft')}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          {translate('button.viewdrafts')} ({waterQualityDrafts.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{translate('button.viewdrafts')} - {translate('dataentry.waterquality')}</DialogTitle>
                          <DialogDescription>
                            View and manage your saved water quality data drafts
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {waterQualityDrafts.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              No water quality drafts saved yet.
                            </div>
                          ) : (
                            waterQualityDrafts.map((draft) => (
                              <Card key={draft.id} className="bg-card/50 border-border/50">
                                <CardHeader>
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <CardTitle className="flex items-center gap-2 text-base">
                                        <Droplets className="w-4 h-4 text-blue-600" />
                                        {draft.location || 'Unnamed Location'}
                                      </CardTitle>
                                      <CardDescription className="text-sm">
                                        {formatDate(draft.timestamp)} • {draft.village}, {draft.district}
                                      </CardDescription>
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deleteWaterQualityDraft(draft.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>State: {draft.state || 'Not specified'}</div>
                                    <div>Source Type: {draft.sourceType || 'Not specified'}</div>
                                    <div>Temperature: {draft.temperature || 'Not specified'}°C</div>
                                    <div>pH: {draft.pH || 'Not specified'}</div>
                                    <div>TDS: {draft.tds || 'Not specified'} ppm</div>
                                    <div>Turbidity: {draft.turbidity || 'Not specified'} NTU</div>
                                  </div>
                                  {draft.quality && (
                                    <div className="mt-2">
                                      <div className="text-sm text-muted-foreground">Visual Quality:</div>
                                      <Badge variant="secondary" className="text-xs mt-1">
                                        {draft.quality}
                                      </Badge>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}