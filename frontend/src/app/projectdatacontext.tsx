import React, { createContext, useState, useContext } from 'react';


type ProjectData = {
    title: string; // Intro.tsx
    elevator_pitch: string; // Intro.tsx
    category: string; // Category.tsx
    subcategory: string; // Category.tsx
    location: string; // Location.tsx
    image_url: string; // Media.tsx
    video_url: string; // Media.tsx
    launch_date: number; // Unix timestamp Launch.tsx
    duration: number; // in seconds Launch.tsx
    funding_goals: number[]; // Assuming 'Balance' type is represented as number in UI Goals.tsx
    reward_tiers: RewardTier[]; // Goals.tsx
    story: string; // story.tsx
    risks_and_challenges: string; // story.tsx
    faqs: FAQ[]; // faq.tsx
    project_info: ProjectInfo; // projectinfo.tsx
    member_info: TeamMember[]; // teaminfo.tsx
    wallet: string; // Assuming AccountId type is represented as string in UI
    project_urls: string[];
};


type RewardTier = {
    amount: number; // Assuming 'Balance' type is represented as number in UI
    description: string;
};

type FAQ = {
    question: string;
    answer: string;
};

type ProjectInfo = {
    name: string;
    info: string;
    image_url: string;
    video_url: string;
    social_media_links: string[];
};

type TeamMember = {
    name: string;
    role: string;
    image_url: string;
    social_media_links: string[];
};


const ProjectDataContext = createContext<{
    projectData: ProjectData;
    setProjectData: (data: ProjectData) => void;
}>({
    projectData: {} as ProjectData, // Explicitly cast the empty object to ProjectData
    setProjectData: () => {},
});

type ProjectDataProviderProps = {
    children: React.ReactNode;
};


export const ProjectDataProvider: React.FC<ProjectDataProviderProps> = ({ children }) => {
    const [projectData, setProjectData] = useState<ProjectData>({} as ProjectData);
    return (
        <ProjectDataContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectDataContext.Provider>
    );
};



export const useProjectData = () => {
    const context = useContext(ProjectDataContext);
    if (!context) {
        throw new Error('useProjectData must be used within a ProjectDataProvider');
    }
    return context;
};


export default ProjectDataContext;
