import * as React from 'react';
import './style.css';
import 'survey-core/modern.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import {useCallback } from "react";

const json = {
  title: 'Wander Survey',
  logoPosition: 'right',
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'dropdown',
          name: 'question3',
          title: 'Number of Travelers',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: '1',
            },
            {
              value: 'Item 2',
              text: '2',
            },
            {
              value: 'Item 3',
              text: '3',
            },
            {
              value: 'Item 4',
              text: '4',
            },
            {
              value: 'Item 5',
              text: '5',
            },
            {
              value: 'Item 6',
              text: '6',
            },
            {
              value: 'Item 7',
              text: '7',
            },
            {
              value: 'Item 8',
              text: '8',
            },
          ],
        },
        {
          type: 'dropdown',
          name: 'question4',
          title: 'Where will you be flying from?',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Chicago',
            },
            {
              value: 'Item 2',
              text: 'Boston',
            },
            {
              value: 'Item 3',
              text: 'Los Angeles',
            },
            {
              value: 'Item 4',
              text: 'New York',
            },
            {
              value: 'Item 5',
              text: 'Austin',
            },
            {
              value: 'Item 6',
              text: 'Miami',
            },
            {
              value: 'Item 7',
              text: 'San Francisco',
            },
            {
              value: 'Item 8',
              text: 'Atlanta',
            },
          ],
        },
        {
          type: 'text',
          name: 'question5',
          title: 'date_to',
          description: 'Date_Picker Custom',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'question6',
          title: 'date of return',
          description: 'Date_Picker Custom',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'question7',
          title: 'Budget?',
          description: 'NoUISlider Custom ',
          isRequired: true,
        },
      ],
      title: 'Basics',
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'text',
          name: 'question1',
          title: 'First Name',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'question2',
          title: 'Last Name',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'question8',
          title: 'Date of Birth',
          description: 'Date Picker Custom',
          isRequired: true,
        },
        {
          type: 'dropdown',
          name: 'question10',
          title: 'Gender',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Male',
            },
            {
              value: 'Item 2',
              text: 'Female',
            },
          ],
        },
        {
          type: 'text',
          name: 'question11',
          title: 'Email',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'question12',
          title: 'Phone Number',
          isRequired: true,
        },
      ],
      title: 'Personal Booking Questions',
    },
    {
      name: 'page3',
      elements: [
        {
          type: 'text',
          name: 'question9',
          title: 'What countries have you already visited?',
          description: 'Country Select Dropdown Custom',
        },
        {
          type: 'dropdown',
          name: 'question13',
          title: 'What best describes you?',
          choices: [
            {
              value: 'Item 1',
              text: "Adventurer - You're an adrenaline seeker and you want something active to do every day on your trip!",
            },
            {
              value: 'Item 4',
              text: 'Relaxing: You prefer beach vacations or all inclusives!',
            },
            {
              value: 'Item 5',
              text: 'Sightseeing: You like museums, tours, places of signifigance, and people watching!',
            },
            {
              value: 'Item 6',
              text: 'Seek Discomfort: You want a trip with things that are completely new to you!',
            },
          ],
        },
        {
          type: 'text',
          name: 'question14',
          title:
            'If you have one, what is the purpose of this trip? Eg: traveling for leisure, business, maybe a special occasion? ',
          description:
            'This will help us suggest destinations better catered to your hopes.',
        },
        {
          type: 'text',
          name: 'question15',
          title: 'Do you have any special requirements or considerations?',
          description:
            'For example: mobility issues, dietary restrictions, or other special requirements.  This will help us recommend destinations that are accommodating to your needs',
        },
        {
          type: 'dropdown',
          name: 'question16',
          title: 'Do you have a region preference? ',
          description:
            'While we recommend you leave it up to chance, we do understand that some travelers want to stay within a certain area.',
          choices: [
            {
              value: 'Item 1',
              text: 'Europe',
            },
            {
              value: 'Item 2',
              text: 'South America',
            },
            {
              value: 'Item 3',
              text: 'Central America',
            },
            {
              value: 'Item 4',
              text: 'Africa',
            },
            {
              value: 'Item 5',
              text: 'SouthernAsia',
            },
            {
              value: 'Item 6',
              text: 'Northern Asia',
            },
          ],
        },
      ],
      title: 'Trip Questions',
      description:
        'These questions help our AI make the best selection possible but are by no means required!',
    },
    {
      name: 'page4',
      elements: [
        {
          type: 'dropdown',
          name: 'question17',
          title: 'Max number of stops? (The more, the better!)',
          choices: [
            {
              value: 'Item 1',
              text: '1',
            },
            {
              value: 'Item 2',
              text: '2',
            },
            {
              value: 'Item 3',
              text: '3',
            },
          ],
        },
        {
          type: 'text',
          name: 'question18',
          title: 'Exclude Certain Airlines? ',
          description:
            "We've all had some bad experiences with airlines, so please list any you would prefer to avoid.",
        },
        {
          type: 'dropdown',
          name: 'question19',
          title: 'Cabin Preference',
          choices: [
            {
              value: 'Item 1',
              text: 'Economy',
            },
            {
              value: 'Item 2',
              text: 'Economy Premium',
            },
            {
              value: 'Item 3',
              text: 'Business',
            },
            {
              value: 'Item 4',
              text: 'First Class',
            },
          ],
        },
      ],
      title: 'Flight Optionals',
      description:
        'None of these are required! We encourage you to fill out as little as possible.',
    },
  ],
};

export default function App() {
  const model = new Model(json);

  // Define the callback function to be called when the survey is completed
  const onComplete = useCallback((survey) => {
    const data = survey.data;
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '~/Dev/Active/wander/model/data/surveyData.json';
    link.click();
  }, []);

  return <Survey model={model} onComplete={onComplete}></Survey>;
}
