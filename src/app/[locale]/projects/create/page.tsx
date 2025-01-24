'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CalendarIcon, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ProjectPreview } from '@/components/previews/ProjectPreview';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  TOAST_DURATION_MS,
} from '@/constants/project-config';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils/tailwind-utils';

dayjs.extend(utc);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSteps = (t: (id: string, options?: any) => string) => [
  { title: t('basic_info'), fields: ['title', 'description', 'bannerImage'] },
  { title: t('funding'), fields: ['fundingGoal'] },
  { title: t('dates'), fields: ['startDate', 'endDate'] },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFormSchema = (t: (id: string, options?: any) => string) =>
  z.object({
    title: z.string().min(2, {
      message: t('input_title_error'),
    }),
    description: z.string().min(10, {
      message: t('input_description_error'),
    }),
    bannerImage: z
      .any()
      .refine((files) => files?.length == 1, t('input_banner_required'))
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        t('input_banner_size_error'),
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        t('input_file_accept'),
      ),
    fundingGoal: z.number().min(1, {
      message: t('input_goal_error'),
    }),
    startDate: z.date().refine(
      (date) => {
        const tomorrow = dayjs().utc().add(1, 'day').startOf('day');
        return dayjs(date).utc().isAfter(tomorrow);
      },
      {
        message: t('input_start_data_error'),
      },
    ),
    endDate: z.date(),
  });

type FormData = z.infer<ReturnType<typeof getFormSchema>>;

export default function CreateProjectPage() {
  const t = useTranslations('Create');
  const router = useRouter();

  const steps = getSteps(t);
  const formSchema = getFormSchema(t);

  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      bannerImage: undefined,
      fundingGoal: 0,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('bannerImage', [file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    form.setValue('bannerImage', undefined);
    setPreviewImage(null);
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.trigger(steps[currentStep].fields as any);
  };

  const validateStep = (step: number) => {
    const fieldsToValidate = steps[step].fields;
    const stepData = form.getValues();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stepErrors: Record<string, any> = {};

    fieldsToValidate.forEach((field) => {
      try {
        formSchema
          .pick({ [field]: true } as { [K in keyof FormData]?: true })
          .parse({ [field]: stepData[field as keyof FormData] });
      } catch (error) {
        if (error instanceof z.ZodError) {
          stepErrors[field] = error.errors[0].message;
        }
      }
    });

    return Object.keys(stepErrors).length === 0;
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const onSubmit = (values: FormData) => {
    if (!steps.every((_, index) => validateStep(index))) {
      const firstInvalidStep = steps.findIndex(
        (_, index) => !validateStep(index),
      );
      setCurrentStep(firstInvalidStep);
      return;
    }
    console.log(values);
    toast({
      title: t('project_created'),
      description: t('project_created_description'),
      duration: TOAST_DURATION_MS,
    });
    router.push('/projects');
  };

  const currentFields = steps[currentStep].fields;

  return (
    <div className="container mx-auto flex max-w-screen-xl gap-8 py-10">
      <div className="w-2/3">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              {t('step_by', {
                current: currentStep + 1,
                total: steps.length,
                title: steps[currentStep].title,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {currentFields.includes('title') && (
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('project_title')}</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project title" {...field} />
                        </FormControl>
                        <FormDescription>
                          {t('title_description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {currentFields.includes('description') && (
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('project_description')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t('description_description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {currentFields.includes('bannerImage') && (
                  <FormField
                    control={form.control}
                    name="bannerImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('banner_image')}</FormLabel>
                        <FormControl>
                          <div className="flex w-full items-center justify-center">
                            {previewImage ? (
                              <div className="relative mb-4 h-80 w-full">
                                <Image
                                  src={previewImage || ''}
                                  alt="Banner preview"
                                  fill
                                  objectFit="cover"
                                  className="rounded-lg"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute right-2 top-2"
                                  onClick={removeImage}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <label
                                htmlFor="dropzone-file"
                                className="dark:hover:bg-bray-800 flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                              >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                  <Upload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                                  <p className="mb-2 whitespace-pre-wrap text-sm text-gray-500 dark:text-gray-400">
                                    {t.rich('click_upload', {
                                      strong: (children) => (
                                        <span className="font-semibold">
                                          {children}
                                        </span>
                                      ),
                                    })}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t('extension_condition')}
                                  </p>
                                </div>
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  onChange={handleImageChange}
                                  accept="image/png, image/jpeg, image/jpg, image/webp"
                                  ref={field.ref}
                                  name={field.name}
                                />
                              </label>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          {t('banner_image_description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {currentFields.includes('fundingGoal') && (
                  <FormField
                    control={form.control}
                    name="fundingGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('funding_goal')}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter funding goal"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          {t('goal_description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {currentFields.includes('startDate') && (
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{t('start_date')}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  dayjs(field.value).format('MMMM D, YYYY')
                                ) : (
                                  <span>{t('pick_date')}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                dayjs()
                                  .utc()
                                  .add(1, 'day')
                                  .startOf('day')
                                  .toDate()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          {t('start_date_description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {currentFields.includes('endDate') && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{t('end_date')}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  dayjs(field.value).format('MMMM D, YYYY')
                                ) : (
                                  <span>{t('pick_date')}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <=
                                (form.getValues('startDate') || new Date())
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          {t('start_date_description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 0}
            >
              {t('previous')}
            </Button>
            <Button
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  goToNextStep();
                } else {
                  form.handleSubmit(onSubmit)();
                }
              }}
            >
              {currentStep < steps.length - 1 ? t('next') : t('create_project')}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="sticky top-4 w-1/3 self-start">
        <ProjectPreview project={form.getValues()} />
      </div>
    </div>
  );
}
