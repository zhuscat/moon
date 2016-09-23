import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
  require('../stories/form.stories.js');
  require('../stories/modal.stories.js');
  require('../stories/table.stories.js');
  require('../stories/datepicker.stories.js')
  require('../stories/menu.stories.js');
  require('../stories/popover.stories.js');
  require('../stories/message.stories.js');
  require('../stories/animator.stories.js');
  require('../stories/stepper.stories.js');
  require('../stories/pagination.stories.js');
  require('../stories/input-in-lab.stories.js');
  require('../stories/form-in-lab.stories.js');
  require('../stories/checkbox.stories.js');
  require('../stories/radio.stories.js');
  require('../stories/select.stories.js');
}

configure(loadStories, module);
