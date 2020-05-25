import * as React from "react";

import { Button, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { TwoLineItem, TwoLineSelect } from "@component/skill/two-line-select";
import { observer, observable } from "@page/decorator";

// todo: real API should get a list of skill regarding to category id;
const skills = [
    {
        category: 0,
        skills: [
            {
                id: 1,
                label: "Developing",
                description: "Able to build or create product related to chosen category"
            },
            {
                id: 2,
                label: "Delivering",
                description: "Experience deliver created product in time"
            },
            {
                id: 3,
                label: "Negotiation",
                description: "Experience to negotiate any circumstances"
            },
            {
                id: 4,
                label: "Design & Architecture",
                description: "Experience to design the future products"
            }
        ]
    },
    {
        category: 3,
        skills: [
            {
                id: 1,
                label: "Graphic Design",
                description: "Experience to create a graphical design of application interfaces"
            },
            {
                id: 2,
                label: "Animation",
                description: "Experience to apply animation to UI component"
            },
            {
                id: 3,
                label: "UX Design",
                description: "User Experience make matter for you"
            },
            {
                id: 4,
                label: "3D Modeling",
                description: "Experience to create and use 3D models in your projects"
            }
        ]
    }
];

const experiences = [
    {
        level: 0,
        label: "Beginner",
        description: "Less than six months"
    },
    {
        level: 1,
        label: "Junior",
        description: "From six months up to one year"
    },
    {
        level: 2,
        label: "Low Intermediate",
        description: "From one year up to two years"
    },
    {
        level: 3,
        label: "Intermediate",
        description: "From two years up to four years"
    },
    {
        level: 4,
        label: "Upper Intermediate",
        description: "From four years up to seven years"
    },
    {
        level: 5,
        label: "Senior",
        description: "More than seven years"
    }
];

export interface Selection {
    category: number;
    skill: TwoLineItem & { id: number };
    experience: TwoLineItem & { level: number };
}

export interface SkillSelectionProps {
    category: number;
    remove: Function;
    onSelectionChange: (sel: Selection) => void
}

const selectionStyle = (exp: TwoLineItem & { level: number }) => ({
    backgroundImage: `linear-gradient(to right, #f5f5f7 ${exp.level * 20}%, #fffffe ${exp.level * 20}%)`
});

function getSkillsByCategory(id: number) {
    const selected = skills.filter(category => category.category === id);
    if (selected && selected.length === 0) {
        return skills[0].skills;
    } else {
        return selected[0].skills;
    }
}

@observer
export class SkillSelection extends React.Component<SkillSelectionProps> {

    @observable
    private category: number;

    @observable
    private skill: TwoLineItem & { id: number };

    @observable
    private experience: TwoLineItem & { level: number };

    private skillRef = React.createRef<TwoLineSelect>();

    private experienceRef = React.createRef<TwoLineSelect>();

    private onSkillChange = (skill) => {
        this.skill = skill;

        this.props.onSelectionChange({
            category: this.category,
            skill: this.skill,
            experience: this.experience
        });
    }

    private onExperienceChange = (experience) => {
        this.experience = experience;

        this.props.onSelectionChange({
            category: this.category,
            skill: this.skill,
            experience: this.experience
        });
    }

    public render() {
        const {category, remove} = this.props;

        return (
            <Space size={20} className="user-skill-selection">
                <TwoLineSelect
                    ref={this.skillRef}
                    data={getSkillsByCategory(category)}
                    inputStyle={{width: 470}}
                    onSelectionChange={(skill: TwoLineItem & { id: number }) => this.onSkillChange(skill)}
                    defaultValue={{label: "Skill", description: "Select your best skill"}}/>

                <TwoLineSelect
                    ref={this.experienceRef}
                    data={experiences}
                    inputStyle={{width: 300}}
                    selectionStyle={selectionStyle}
                    onSelectionChange={(experience: TwoLineItem & { level: number }) => this.onExperienceChange(experience)}
                    defaultValue={{label: "Experience", description: "Select your level"}}/>
                {
                    remove === null
                        ? <div style={{width: 54, height: 54}}/>
                        : <Button
                            type="link"
                            style={{width: 54, height: 54, padding: 0, textAlign: "center", color: "rgba(0, 0, 10, 0.35)"}}
                            onClick={() => remove()}>
                            <MinusCircleOutlined/>
                            <br/>
                            <span>Remove</span>
                        </Button>
                }
            </Space>
        )
    }
}
