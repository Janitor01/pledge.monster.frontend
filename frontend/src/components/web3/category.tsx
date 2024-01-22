'use client';
import React, { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { useProjectData } from '../../app/projectdatacontext';
import { Button } from '@/components/ui/button';
import { cn } from "@/utils/cn";
import categories from 'src/config/categories.json'


type CategoryFormData = {
    category: string;
    subcategory: string;
};

export const Category: FC = () => {
    const methods = useForm<CategoryFormData>({
        defaultValues: { category: '', subcategory: '' } // Set default values for category and subcategory
    });
    const { projectData, setProjectData } = useProjectData();
    const [selectedCategory, setSelectedCategory] = useState("");

    const onSubmit = (data: CategoryFormData) => {
        console.log(data);
        setProjectData({ ...projectData, ...data });
    };

    const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <FormProvider {...methods}>
            <Card className="card-component">
                <CardContent className="pb-3 pt-6">
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        <div>
                            <label htmlFor="category" className="text-base">Category</label>
                            <select {...methods.register('category')} id="category" className={inputClassName}>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subcategory" className="text-base">Subcategory</label>
                            <select {...methods.register('subcategory')} id="subcategory" className={inputClassName}>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
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

export default Category;
