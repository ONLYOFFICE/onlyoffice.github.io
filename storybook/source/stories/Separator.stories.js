export default {
  title: 'Components/Separator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Separator from ONLYOFFICE plugin UI.'
      }
    }
  }
};

export const Horizontal = () => `
  <div class="separator horizontal" style="margin: 5px 0;"></div>
`;

Horizontal.storyName = 'Horizontal Separator';
