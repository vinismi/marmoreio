// src/ai/flows/marmorized-pattern-assessment.ts
'use server';
/**
 * @fileOverview Assesses patterns of color/texture choices on a marmorized painting based on user input.
 *
 * - assessMarmorizedPattern - A function that initiates the pattern assessment flow.
 * - MarmorizedPatternAssessmentInput - The input type for the assessMarmorizedPattern function.
 * - MarmorizedPatternAssessmentOutput - The return type for the assessMarmorizedPattern function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarmorizedPatternAssessmentInputSchema = z.object({
  aestheticChoice: z
    .string()
    .describe('The user selected image of the marmorized floor they find most aesthetically pleasing.'),
  colorTextureChoice: z
    .string()
    .describe(
      'The user selected combination of color and texture for a luxury floor (e.g., White + Gold Veins, Mirrored Black, Pearlescent Blue)'
    ),
  finishChoice: z
    .string()
    .describe(
      'The user selected finish type (e.g., Mirror Shine, Natural Satin, Pearlescent Effect)'
    ),
});
export type MarmorizedPatternAssessmentInput = z.infer<typeof MarmorizedPatternAssessmentInputSchema>;

const MarmorizedPatternAssessmentOutputSchema = z.object({
  patternAssessment: z
    .string()
    .describe(
      'An assessment of the user selected choices and how they combine to create a unique marmorized pattern, offering inspiration and ideas.'
    ),
});
export type MarmorizedPatternAssessmentOutput = z.infer<typeof MarmorizedPatternAssessmentOutputSchema>;

export async function assessMarmorizedPattern(
  input: MarmorizedPatternAssessmentInput
): Promise<MarmorizedPatternAssessmentOutput> {
  return marmorizedPatternAssessmentFlow(input);
}

const marmorizedPatternAssessmentPrompt = ai.definePrompt({
  name: 'marmorizedPatternAssessmentPrompt',
  input: {schema: MarmorizedPatternAssessmentInputSchema},
  output: {schema: MarmorizedPatternAssessmentOutputSchema},
  prompt: `You are an expert in marmorized painting and design. Assess the user's choices for creating a unique marmorized pattern. Provide inspiration and ideas based on their selections. 

The user has made the following selections:

- Aesthetically pleasing floor image: {{{aestheticChoice}}}
- Color and Texture Combination: {{{colorTextureChoice}}}
- Finish Type: {{{finishChoice}}}

Based on these choices, provide a detailed assessment of the resulting marmorized pattern. Consider the harmony and contrast of the chosen elements, and offer creative ideas or variations that the user might find inspiring. Focus on how the combination of these elements results in a unique look and feel. Offer creative ideas or variations that the user might find inspiring.
`,
});

const marmorizedPatternAssessmentFlow = ai.defineFlow(
  {
    name: 'marmorizedPatternAssessmentFlow',
    inputSchema: MarmorizedPatternAssessmentInputSchema,
    outputSchema: MarmorizedPatternAssessmentOutputSchema,
  },
  async input => {
    const {output} = await marmorizedPatternAssessmentPrompt(input);
    return output!;
  }
);
