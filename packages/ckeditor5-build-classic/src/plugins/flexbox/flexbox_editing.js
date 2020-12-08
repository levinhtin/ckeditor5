import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertFlexBoxCommand from './flexbox_command';

class FlexBoxEditing extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		// console.log( 'FlexBoxEditing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertFlexBox', new InsertFlexBoxCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'flexBox', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block',
			allowAttributes: [ 'style' ]
		} );

		schema.register( 'flexBoxItem', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'flexBox',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root',
			allowAttributes: [ 'style' ]
		} );

		// schema.addChildCheck( ( context, childDefinition ) => {
		// 	if ( context.endsWith( 'flexBoxDescription' ) && childDefinition.name == 'flexBox' ) {
		// 		return false;
		// 	}
		// } );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// <flexBox> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'flexBox',
			view: {
				name: 'section',
				classes: 'flex-box'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'flexBox',
			view: {
				name: 'section',
				classes: 'flex-box'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'flexBox',
			view: ( modelElement, viewWriter ) => {
				const section = viewWriter.createContainerElement(
					'section',
					{ class: 'flex-box', style: 'display: "flex"; flex-direction: "row";' },
				);

				return toWidget( section, viewWriter, { label: 'flex box widget' } );
			}
		} );

		// <flexBoxItem> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'flexBoxItem',
			view: {
				name: 'div',
				classes: 'flex-box-description'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'flexBoxItem',
			view: {
				name: 'div',
				classes: 'flex-box-description'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'flexBoxItem',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'flex-box-item', style: 'flex: 1;' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );
	}
}

export default FlexBoxEditing;
