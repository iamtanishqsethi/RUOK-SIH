import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button.tsx";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Brain, TrendingUp, AlertTriangle, BookOpen, X } from 'lucide-react';

interface GHQResultsProps {
  scores: {
    bimodalScore: number;
    likertScore: number;
    maxBimodalScore: number;
    maxLikertScore: number;
  };
  userInfo: {
    fullName: string;
    age: number;
    gender: string;
    maritalStatus: string;
    occupation?: string;
  };
  onClose: () => void;
}

const GHQResults: React.FC<GHQResultsProps> = ({ scores, userInfo, onClose }) => {
  const navigate = useNavigate();

  const getInterpretation = () => {
    const bimodalRisk = scores.bimodalScore >= 3;
    const likertRisk = scores.likertScore >= 12;
    
    if (bimodalRisk || likertRisk) {
      return {
        level: 'elevated',
        title: 'Elevated Psychological Distress Detected',
        message: 'Your scores suggest you may be experiencing psychological distress. Consider speaking with a mental health professional.',
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        icon: AlertTriangle
      };
    } else {
      return {
        level: 'normal',
        title: 'Normal Range',
        message: 'Your scores fall within the normal range, suggesting good psychological wellbeing.',
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: CheckCircle
      };
    }
  };

  const interpretation = getInterpretation();
  const IconComponent = interpretation.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 animate-in zoom-in-95 duration-300">
        <CardHeader className="relative pb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <CardTitle className="text-3xl text-center text-card-foreground">
            Assessment Complete
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Thank you, {userInfo.fullName}, for completing the GHQ-12 assessment
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Bimodal Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {scores.bimodalScore}/{scores.maxBimodalScore}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-1000"
                    style={{ width: `${(scores.bimodalScore / scores.maxBimodalScore) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Scores ≥3 may indicate psychological distress
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Likert Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {scores.likertScore}/{scores.maxLikertScore}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-1000"
                    style={{ width: `${(scores.likertScore / scores.maxLikertScore) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Scores ≥12 may indicate psychological distress
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className={`border-2 ${interpretation.borderColor} ${interpretation.bgColor}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${interpretation.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${interpretation.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-2 ${interpretation.color}`}>
                    {interpretation.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {interpretation.message}
                  </p>
                  
                  <div className="bg-card/50 rounded-lg p-4 border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Understanding Your Results
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• The GHQ-12 is a clinically validated screening tool</li>
                      <li>• It measures psychological distress and general mental health</li>
                      <li>• This is a screening tool, not a diagnostic instrument</li>
                      <li>• Consider professional consultation for clinical concerns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Assessment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <div className="font-medium">{userInfo.age} years</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>
                  <div className="font-medium capitalize">{userInfo.gender}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Marital Status:</span>
                  <div className="font-medium capitalize">{userInfo.maritalStatus}</div>
                </div>
                {userInfo.occupation && (
                  <div>
                    <span className="text-muted-foreground">Occupation:</span>
                    <div className="font-medium">{userInfo.occupation}</div>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                <p>Assessment completed on {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <InteractiveHoverButton
              className="flex-1 text-lg py-3"
              onClick={() => navigate('/main/book')}
            >
              Book Consultation Session
            </InteractiveHoverButton>
            
            {/* <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3"
            >
              Close Results
            </Button> */}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 border text-xs text-muted-foreground">
            <p className="font-medium mb-1">Important Disclaimer:</p>
            <p>
              This assessment is for screening purposes only and does not constitute medical diagnosis, 
              treatment, or professional advice. If you're experiencing mental health concerns, please 
              consult with a qualified healthcare professional or mental health provider.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GHQResults;