'use client'
import React, { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { useProjectData } from '../../app/projectdatacontext';
import { cn } from "@/utils/cn";
import { Button } from '@/components/ui/button'

type StoryFormData = {
    title: string;
    elevator_pitch: string;
    // ...other fields as needed
};

export const Story: FC = () => {
    const methods = useForm<StoryFormData>();
    const { projectData, setProjectData } = useProjectData();

    const onSubmit = (data: StoryFormData) => {
        console.log(data);
        setProjectData({ ...projectData, ...data });
    };

     // Adjusted input style for full width
     const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

     return (
         <FormProvider {...methods}>
             <Card className="card-component">
                 <CardContent className="pb-3 pt-6">
                     <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                         <div className={cn("space-y-2 w-full")}>
                            <label htmlFor="title" className={cn(methods.formState.errors.title && "text-destructive", "text-base")}>
                                Project Title
                            </label>
                            <input 
                              {...methods.register('title')} 
                              type="text" 
                              id="title" 
                              className={inputClassName} 
                            />
                            {/* Error messages and descriptions as before */}
                        </div>
                        <div className={cn("space-y-2")}>
                            <label htmlFor="elevator_pitch" className={cn(methods.formState.errors.elevator_pitch && "text-destructive", "text-base")}>
                                Elevator Pitch
                            </label>
                            <input 
                              {...methods.register('elevator_pitch')} 
                              type="text" 
                              id="elevator_pitch" 
                              className={inputClassName} 
                            />
                            {/* Error messages and descriptions as before */}
                        </div>
                        <Button>
                        <input type="submit" value="Submit" className={cn("submit-button-style")}/>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </FormProvider>
    );
};

export default Story;
