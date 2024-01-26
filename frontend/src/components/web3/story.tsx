'use client'
import React, { FC, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { useProjectData } from '../../app/projectdatacontext';
import { cn } from "@/utils/cn";
import { Button } from '@/components/ui/button';

type StoryFormData = {
    story: string;
    risks_and_challenges: string;
};

export const Story: FC = () => {
    const methods = useForm<StoryFormData>();
    const { projectData, setProjectData } = useProjectData();
    const storyRef = useRef<HTMLTextAreaElement>(null);
    const risksRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = (ref: any) => {
        if (ref.current) {
            ref.current.style.height = 'inherit';
            const maxHeight = parseInt(window.getComputedStyle(ref.current).maxHeight, 10);
            ref.current.style.height = `${Math.min(ref.current.scrollHeight, maxHeight)}px`;
        }
    };
    

    const onSubmit = (data: StoryFormData) => {
        console.log(data);
        setProjectData({ ...projectData, ...data });
    };

    
    const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const textareaClassName = `${inputClassName} max-height-textarea resize-none`;

    return (
        <FormProvider {...methods}>
            <Card className="card-component">
                <CardContent className="pb-3 pt-6">
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        <div className={cn("space-y-2 w-full")}>
                            <label htmlFor="story" className="text-base">Story</label>
                            <textarea 
                                {...methods.register('story')} 
                                id="story" 
                                className={textareaClassName} 
                                ref={storyRef} 
                                onChange={() => adjustTextareaHeight(storyRef)}
                            />
                        </div>
                        <div className={cn("space-y-2 w-full")}>
                            <label htmlFor="risks_and_challenges" className="text-base">Risks and Challenges</label>
                            <textarea 
                                {...methods.register('risks_and_challenges')} 
                                id="risks_and_challenges" 
                                className={textareaClassName} 
                                ref={risksRef} 
                                onChange={() => adjustTextareaHeight(risksRef)}
                            />
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
