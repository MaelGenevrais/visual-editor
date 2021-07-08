import { EditorField, EditorFieldProps } from '../types'
import { useUniqId } from '../hooks/useUniqId'
import { AbstractField } from './AbstractField'
import { QuillEditor, QuillEditorMode } from './shared/QuillEditor'

type FieldArgs = {
  label?: string
  required?: boolean
  multiline?: boolean
  help?: string
  allowHeadings?: boolean
  colors?: string[]
}

/**
 * Enregistre un champs de type texte
 */
export class HTMLText
  extends AbstractField<FieldArgs, string>
  implements EditorField<string>
{
  defaultArgs = {
    multiline: true,
    allowHeadings: false,
  }

  field({ value, onChange }: EditorFieldProps<string>) {
    return (
      <div class="form-group">
        {this.args.label && <label class="form-label">{this.args.label}</label>}
        <div className="ve-input">
          <QuillEditor
            value={value || ''}
            onChange={onChange}
            mode={this.fieldType()}
            colors={this.args.colors}
          />
        </div>
        {this.args.help && <div class="form-text">{this.args.help}</div>}
      </div>
    )
  }

  private fieldType() {
    if (this.args.multiline === false) {
      return QuillEditorMode.SINGLE_LINE
    }
    if (this.args.allowHeadings) {
      return QuillEditorMode.FULL
    }
    return QuillEditorMode.DEFAULT
  }
}