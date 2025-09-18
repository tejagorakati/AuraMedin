import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  FileText, 
  UserPlus, 
  Droplets, 
  Trash2, 
  Calendar,
  MapPin,
  User,
  Activity
} from "lucide-react";
import { useData } from "./DataContext";

export function Drafts() {
  const { 
    patientDrafts, 
    waterQualityDrafts, 
    deletePatientDraft, 
    deleteWaterQualityDraft,
    translate 
  } = useData();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <section id="drafts" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <FileText className="w-3 h-3 mr-1" />
            {translate('header.drafts')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Saved Drafts
            <br />
            <span className="text-blue-600">Continue Your Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access your saved draft entries and continue where you left off. 
            Complete and submit your data when ready.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="patient-drafts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="patient-drafts" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Patient Drafts ({patientDrafts.length})
              </TabsTrigger>
              <TabsTrigger value="water-drafts" className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Water Quality Drafts ({waterQualityDrafts.length})
              </TabsTrigger>
            </TabsList>

            {/* Patient Drafts */}
            <TabsContent value="patient-drafts">
              <div className="space-y-4">
                {patientDrafts.length === 0 ? (
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-12 text-center">
                      <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Patient Drafts</h3>
                      <p className="text-muted-foreground">
                        You haven't saved any patient data drafts yet.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  patientDrafts.map((draft) => (
                    <Card key={draft.id} className="bg-card/50 border-border/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <User className="w-5 h-5 text-blue-600" />
                              {draft.name || 'Unnamed Patient'}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(draft.timestamp)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {draft.village}, {draft.district}
                              </span>
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Age:</span>
                            <p className="font-medium">{draft.age || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Gender:</span>
                            <p className="font-medium">{draft.gender || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Days of Symptoms:</span>
                            <p className="font-medium">{draft.daysOfSymptoms || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Water Source:</span>
                            <p className="font-medium">{draft.primaryWaterSource || 'Not specified'}</p>
                          </div>
                        </div>
                        {draft.symptoms.length > 0 && (
                          <div className="mb-4">
                            <span className="text-sm text-muted-foreground">Symptoms:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {draft.symptoms.map((symptom, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Continue Editing
                          </Button>
                          <Button size="sm" variant="outline">
                            Complete & Submit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Water Quality Drafts */}
            <TabsContent value="water-drafts">
              <div className="space-y-4">
                {waterQualityDrafts.length === 0 ? (
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-12 text-center">
                      <Droplets className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Water Quality Drafts</h3>
                      <p className="text-muted-foreground">
                        You haven't saved any water quality analysis drafts yet.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  waterQualityDrafts.map((draft) => (
                    <Card key={draft.id} className="bg-card/50 border-border/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Droplets className="w-5 h-5 text-blue-600" />
                              {draft.location || 'Unnamed Location'}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(draft.timestamp)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {draft.village}, {draft.district}, {draft.state}
                              </span>
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Temperature:</span>
                            <p className="font-medium">{draft.temperature || 'Not measured'}°C</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">TDS:</span>
                            <p className="font-medium">{draft.tds || 'Not measured'} ppm</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">pH Level:</span>
                            <p className="font-medium">{draft.pH || 'Not measured'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Turbidity:</span>
                            <p className="font-medium">{draft.turbidity || 'Not measured'} NTU</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Source Type:</span>
                            <p className="font-medium">{draft.sourceType || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Water Quality:</span>
                            <p className="font-medium">{draft.quality || 'Not assessed'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Continue Editing
                          </Button>
                          <Button size="sm" variant="outline">
                            Complete & Submit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}