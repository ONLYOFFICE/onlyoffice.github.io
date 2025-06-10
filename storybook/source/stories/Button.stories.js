export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Various styled buttons from ONLYOFFICE plugin UI.'
      }
    }
  }
};

export const Default = () => `
  <button class="btn-text-default" style="width:75px;">Button 1</button>
`;
Default.storyName = 'Default Button';

export const Primary = () => `
  <button class="btn-text-default submit primary" style="width:75px;">Button 2</button>
`;
Primary.storyName = 'Primary Button';

export const Secondary = () => `
  <button class="btn-text-default submit" style="width:75px;">Button 3</button>
`;
Secondary.storyName = 'Secondary Button';

export const EditButton = () => `
  <label class="for-combo">Edit button</label>
  <div class="btn-edit" style="display: inline-block; margin-left: 10px;"></div>
`;
EditButton.storyName = 'Edit Button';
