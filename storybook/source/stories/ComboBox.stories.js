export default {
  title: 'Components/ComboBox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ComboBox from ONLYOFFICE plugin UI.'
      }
    }
  }
};

export const ComboBox = () => `
  <label class="header" for="select_example">ComboBox</label>
  <select id="select_example" class="">
    <option value="1">Item 1</option>
    <option value="2">Item 2</option>
    <option value="3">Item 3</option>
  </select>
`;

ComboBox.storyName = 'ComboBox';
