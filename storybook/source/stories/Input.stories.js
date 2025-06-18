export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Various styled inputs from ONLYOFFICE plugin UI.'
      }
    }
  }
};

export const Textarea = () => `
  <textarea
    style="height:45px;width: 100%;"
    class="form-control"
    placeholder="textarea control"
  ></textarea>
`;

Textarea.storyName = 'Textarea Control';

export const TextField = () => `
  <input
    type="text"
    class="form-control"
    placeholder="text field"
    style="width: 100%; margin-bottom: 2px;"
  >
`;

TextField.storyName = 'Text Field Control';
