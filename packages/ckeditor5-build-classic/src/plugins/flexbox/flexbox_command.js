import Command from '@ckeditor/ckeditor5-core/src/command';

class InsertFlexBoxCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			// Insert <flexBox>*</flexBox> at the current selection position
			// in a way that will result in creating a valid model structure.
			this.editor.model.insertContent( createFlexBox( writer ) );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'flexBox' );

		this.isEnabled = allowedIn !== null;
	}
}

function createFlexBox( writer ) {
	const flexBox = writer.createElement( 'flexBox' );
	const flexBoxItem = writer.createElement( 'flexBoxItem' );

	writer.append( flexBoxItem, flexBox );
	writer.append( flexBoxItem, flexBox );

	// There must be at least one paragraph for the description to be editable.
	// See https://github.com/ckeditor/ckeditor5/issues/1464.
	writer.appendElement( 'paragraph', flexBoxItem );

	return flexBox;
}

export default InsertFlexBoxCommand;
