import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './../icons/source.svg';
import { /* getData, */ setData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';

let viewCode = false;

class ViewSource extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'viewSource', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'View Source',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the icon is clicked.
			view.on( 'execute', () => {
				if ( viewCode ) {
					const plainText = editor.editing.view.getDomRoot().textContent;
					editor.setData( plainText );
					viewCode = false;
				} else {
					const dataOfModel = editor.getData();
					setData( editor.model, '' );
					editor.model.change( writer => {
						const insertPosition = editor.model.document.selection.getFirstPosition();
						writer.insertText( dataOfModel, insertPosition );
						viewCode = true;
					} );
				}
			} );
			return view;
		} );
	}
}

export default ViewSource;
