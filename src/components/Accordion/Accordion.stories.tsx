import React from 'react';
import {Accordion, AccordionProps} from "./Accordion";
import type {Meta, StoryFn} from "@storybook/react-vite"

export default {
  title: 'components/Accordion',
  component: Accordion,
  args: {
    title: 'My title',
    children: 'Content',
  },
  parameters: {
    controls: {
      exclude: ['innerControl', 'onToggle', 'isOpen']
    }
  }
} satisfies Meta<AccordionStoryProps>


type AccordionStoryProps = Pick<AccordionProps, 'title' | 'children'>

export const AccordionStoryTemplate: StoryFn<AccordionStoryProps> = ({...args}) => (
  <Accordion {...args} innerControl/>
);


AccordionStoryTemplate.storyName = 'Accordion'


