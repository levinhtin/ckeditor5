import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FlexBoxUI from './flexbox_ui';
import FlexBoxEditing from './flexbox_editing';

class FlexBox extends Plugin {
	static get requires() {
		return [ FlexBoxEditing, FlexBoxUI ];
	}
}

export default FlexBox;
