import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
  require('../stories/form.stories.js');
  require('../stories/modal.stories.js');
  require('../stories/table.stories.js');
  require('../stories/datepicker.stories.js')
  require('../stories/menu.stories.js');
  require('../stories/popover.stories.js');
}

configure(loadStories, module);
