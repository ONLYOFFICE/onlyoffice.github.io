export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Checkbox from ONLYOFFICE plugin UI.'
      }
    }
  }
};

export const Basic = () => `
  <input type="checkbox" class="form-control" style="vertical-align: middle;">
  <label style="margin-left: 5px; vertical-align: middle;">Checkbox</label>
`;

Basic.storyName = 'Default';
