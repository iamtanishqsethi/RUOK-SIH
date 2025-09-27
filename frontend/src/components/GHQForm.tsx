import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, User, FileText, Send, Heart } from 'lucide-react';
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useNavigate} from "react-router-dom";
import GHQResults from './GHQResults';

const ghqQuestions = [
  {
    id: "q1",
    question: "Have you recently been able to concentrate on whatever you're doing?",
    options: ["Better than usual", "Same as usual", "Less than usual", "Much less than usual"]
  },
  {
    id: "q2",
    question: "Have you recently lost much sleep over worry?",
    options: ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"]
  },
  {
    id: "q3",
    question: "Have you recently felt that you were playing a useful part in things?",
    options: ["More so than usual", "Same as usual", "Less so than usual", "Much less than usual"]
  },
  {
    id: "q4",
    question: "Have you recently felt capable of making decisions about things?",
    options: ["More so than usual", "Same as usual", "Less so than usual", "Much less capable"]
  },
  {
    id: "q5",
    question: "Have you recently felt constantly under strain?",
    options: ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"]
  },
  {
    id: "q6",
    question: "Have you recently felt you couldn't overcome your difficulties?",
    options: ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"]
  },
  {
    id: "q7",
    question: "Have you recently been able to enjoy your normal day-to-day activities?",
    options: ["More so than usual", "Same as usual", "Less so than usual", "Much less than usual"]
  },
  {
    id: "q8",
    question: "Have you recently been able to face up to problems?",
    options: ["More so than usual", "Same as usual", "Less able than usual", "Much less able"]
  },
  {
    id: "q9",
    question: "Have you recently been feeling unhappy or depressed?",
    options: ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"]
  },
  {
    id: "q10",
    question: "Have you recently been losing confidence in yourself?",
    options: ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"]
  },
  {
    id: "q11",
    question: "Have you recently been thinking of yourself as a worthless person?",
    options: ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"]
  },
  {
    id: "q12",
    question: "Have you recently been feeling reasonably happy, all things considered?",
    options: ["More so than usual", "About the same as usual", "Less so than usual", "Much less than usual"]
  }
];

const ghqFormSchema = Joi.object({
  fullName: Joi.string().min(2).required().messages({
    'string.empty': 'Full name is required.',
    'string.min': 'Full name must be at least 2 characters.',
  }),
  age: Joi.number().min(18).max(120).required().messages({
    'number.base': 'Age must be a number.',
    'number.min': 'You must be at least 18 years old.',
    'number.max': 'Age seems too high.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Please select a gender.',
    'string.empty': 'Please select a gender.',
  }),
  maritalStatus: Joi.string().valid('single', 'married', 'divorced', 'widowed').required().messages({
    'any.only': 'Please select marital status.',
    'string.empty': 'Please select marital status.',
  }),
  occupation: Joi.string().allow('', null),
  q1: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 1.'}),
  q2: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 2.'}),
  q3: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 3.'}),
  q4: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 4.'}),
  q5: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 5.'}),
  q6: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 6.'}),
  q7: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 7.'}),
  q8: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 8.'}),
  q9: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 9.'}),
  q10: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 10.'}),
  q11: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 11.'}),
  q12: Joi.number().integer().min(0).max(3).required().messages({'any.required':'Please answer question 12.'}),
  additionalComments: Joi.string().allow('', null),
});

type GHQFormValues = {
  fullName: string;
  age: number;
  gender: string;
  maritalStatus: string;
  occupation?: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  q11: number;
  q12: number;
  additionalComments?: string;
};

const calculateGHQScore = (responses: Partial<GHQFormValues>) => {
  const bimodalScore = ghqQuestions.reduce((total, question) => {
    const value = responses[question.id as keyof GHQFormValues] as number;
    if (value === undefined) return total;
    return total + (value >= 2 ? 1 : 0);
  }, 0);
  const likertScore = ghqQuestions.reduce((total, question) => {
    const value = responses[question.id as keyof GHQFormValues] as number;
    if (value === undefined) return total;
    return total + value;
  }, 0);
  return { bimodalScore, likertScore, maxBimodalScore: 12, maxLikertScore: 36 };
};

const QuestionCard: React.FC<{
  question: typeof ghqQuestions[0];
  questionNumber: number;
  field: any;
  error?: string;
}> = ({ question, questionNumber, field, error }) => {
  return (
    <Card className="border-2 border-border hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs shadow-lg">
            {questionNumber}
          </div>
          <CardTitle className="text-base font-medium text-card-foreground leading-relaxed">
            {question.question}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={field.value?.toString() ?? ""}
          onValueChange={(value) => field.onChange(parseInt(value))}
          className="grid gap-2"
        >
          {question.options.map((option, index) => (
            <Label
              key={`${question.id}_${index}`}
              htmlFor={`${question.id}_${index}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-accent"
            >
              <RadioGroupItem 
                value={index.toString()} 
                id={`${question.id}_${index}`}
                className="text-primary border-2 border-border flex-shrink-0"
              />
              <span className="text-muted-foreground group-hover:text-foreground text-sm font-normal transition-colors flex-1">
                {option}
              </span>
            </Label>
          ))}
        </RadioGroup>
        {error && (
          <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-xs flex items-center gap-2">
              <span className="w-3 h-3 text-destructive">⚠</span>
              {error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const GHQForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 14;
  const navigate = useNavigate();
  
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<{
    scores: { bimodalScore: number; likertScore: number; maxBimodalScore: number; maxLikertScore: number };
    userInfo: { fullName: string; age: number; gender: string; maritalStatus: string; occupation?: string };
  } | null>(null);

  const form = useForm<GHQFormValues>({
    resolver: joiResolver(ghqFormSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      age: 18,
      gender: '',
      maritalStatus: '',
      occupation: '',
      q1: undefined,
      q2: undefined,
      q3: undefined,
      q4: undefined,
      q5: undefined,
      q6: undefined,
      q7: undefined,
      q8: undefined,
      q9: undefined,
      q10: undefined,
      q11: undefined,
      q12: undefined,
      additionalComments: '',
    },
  });

  const watchedValues = form.watch();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const onSubmit = async (values: GHQFormValues) => {
    const scores = calculateGHQScore(values);

    const userInfo = {
      fullName: values.fullName,
      age: values.age,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      occupation: values.occupation
    };
    
    setAssessmentResults({ scores, userInfo });
    setShowResults(true);
  };

  const canProceed = () => {
    if (currentStep === 0) {
      const { fullName, gender, maritalStatus } = watchedValues;
      return fullName && fullName.length >= 2 && gender && maritalStatus;
    }
    if (currentStep >= 1 && currentStep <= 12) {
      const questionKey = `q${currentStep}` as keyof GHQFormValues;
      return watchedValues[questionKey] !== undefined;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    // Personal Information Step
    if (currentStep === 0) {
      return (
        <Card className="border-2 border-border shadow-lg bg-card">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl text-card-foreground">Welcome to GHQ-12</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Please provide some basic information about yourself to begin your mental health assessment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-semibold text-sm">Full Name *</Label>
                <Input 
                  id="fullName" 
                  {...form.register('fullName')} 
                  className="h-10 text-sm bg-background border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all"
                  placeholder="Enter your full name"
                />
                {form.formState.errors.fullName && (
                  <p className="text-destructive text-xs">{form.formState.errors.fullName.message as string}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground font-semibold text-sm">Age *</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    {...form.register('age', { valueAsNumber: true })} 
                    className="h-10 text-sm bg-background border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all"
                    placeholder="Your age"
                  />
                  {form.formState.errors.age && (
                    <p className="text-destructive text-xs">{form.formState.errors.age.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-semibold text-sm">Gender *</Label>
                  <Controller name="gender" control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-10 text-sm bg-background border-2 border-input focus:border-ring">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.gender && (
                    <p className="text-destructive text-xs">{form.formState.errors.gender.message as string}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-semibold text-sm">Marital Status *</Label>
                  <Controller name="maritalStatus" control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-10 text-sm bg-background border-2 border-input focus:border-ring">
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.maritalStatus && (
                    <p className="text-destructive text-xs">{form.formState.errors.maritalStatus.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-foreground font-semibold text-sm">Occupation (Optional)</Label>
                  <Input 
                    id="occupation" 
                    {...form.register('occupation')} 
                    className="h-10 text-sm bg-background border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all"
                    placeholder="Your occupation"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (currentStep >= 1 && currentStep <= 12) {
      const questionIndex = currentStep - 1;
      const question = ghqQuestions[questionIndex];
      const fieldName = question.id as keyof GHQFormValues;

      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-2xl text-foreground">Mental Health Assessment</h2>
            </div>
            <p className="text-muted-foreground">
              Question {currentStep} of 12 - Please think about how you've been feeling over the past few weeks
            </p>
          </div>

          <Controller
            name={fieldName}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <QuestionCard
                question={question}
                questionNumber={currentStep}
                field={field}
                error={error?.message}
              />
            )}
          />
        </div>
      );
    }

    if (currentStep === 13) {
      return (
        <Card className="border-2 border-border shadow-lg bg-card">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl text-card-foreground">Almost Done!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Any additional thoughts or concerns you'd like to share? (This step is completely optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="additionalComments" className="text-foreground font-semibold text-sm">
                Additional Comments
              </Label>
              <Textarea 
                id="additionalComments" 
                {...form.register('additionalComments')}
                className="min-h-[100px] text-sm bg-background border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 resize-none transition-all"
                placeholder="Share any additional thoughts, concerns, or context about your recent experiences..."
              />
            </div>

            <div className="p-4 bg-accent/20 rounded-lg border border-accent">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-red-500" />
                About Your GHQ-12 Assessment
              </h3>
              <div className="text-xs text-muted-foreground space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 text-xs">•</span>
                  The GHQ-12 is a clinically validated screening tool for psychological distress and general mental health
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xs">•</span>
                  Your responses will be scored using standardized clinical methods (both bimodal and Likert scoring)
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 text-xs">•</span>
                  Higher scores may indicate psychological distress that could benefit from professional support
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1 text-xs">•</span>
                  This assessment is for screening purposes only and does not constitute medical diagnosis or advice
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden relative">
      {showResults && assessmentResults && (
        <GHQResults
          scores={assessmentResults.scores}
          userInfo={assessmentResults.userInfo}
          onClose={() => {
            setShowResults(false);
            setAssessmentResults(null);
            form.reset();
            setCurrentStep(0);
          }}
        />
      )}

      <div className="bg-card border-b border-border flex-shrink-0">
        <div className="px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">General Health Questionnaire</h1>
              <p className="text-muted-foreground text-sm mt-1">GHQ-12 Mental Health Assessment</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Step {currentStep + 1} of {totalSteps}</div>
              <div className="w-32">
                <Progress value={progress} className="h-2 bg-muted" />
                <div className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <div className="flex items-center justify-center min-h-full">
            <div className="w-full max-w-3xl">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border-t border-border flex-shrink-0">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 h-10 transition-all hover:shadow-md disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-center">
              <div className="text-xs font-medium text-foreground">
                {currentStep === 0 && "Personal Information"}
                {currentStep >= 1 && currentStep <= 12 && `Question ${currentStep} of 12`}
                {currentStep === 13 && "Final Step"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {currentStep === 0 && "Basic details to begin"}
                {currentStep >= 1 && currentStep <= 12 && "Mental health assessment"}
                {currentStep === 13 && "Optional comments & submit"}
              </div>
            </div>

            {currentStep < totalSteps - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-4 py-2 h-10 transition-all hover:shadow-md disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
                className="flex items-center gap-2 px-6 py-2 h-10  transition-all hover:shadow-md disabled:opacity-50"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    Submit Assessment
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GHQForm;