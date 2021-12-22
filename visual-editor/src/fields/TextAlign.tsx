import { AbstractField } from 'src/fields/AbstractField'
import { EditorFieldProps } from 'src/types'
import {
  Field,
  IconTextCenter,
  IconTextLeft,
  IconTextRight,
} from 'src/components/ui'
import React, { SyntheticEvent } from 'react'
import Styles from './Alignment.module.scss'

const AlignmentIcons = {
  left: IconTextLeft,
  center: IconTextCenter,
  right: IconTextRight,
}

type FieldValue = keyof typeof AlignmentIcons

type FieldArgs = {
  label?: string
  vertical?: boolean
  default?: FieldValue
}

export class TextAlign extends AbstractField<FieldArgs, FieldValue> {
  get defaultArgs() {
    return {
      default: 'left' as FieldValue,
    }
  }

  field({ value, onChange }: EditorFieldProps<FieldValue>) {
    const handleChange = (e: SyntheticEvent) => {
      onChange((e.target as HTMLInputElement).value as FieldValue)
    }
    const alignements = Object.keys(AlignmentIcons)
    return (
      <Field label={this.args.label}>
        <div className={Styles.Alignments}>
          {alignements.map((alignment) => (
            <AlignmentButton
              key={alignment}
              alignment={alignment}
              checked={value === alignment}
              onChange={handleChange}
            />
          ))}
        </div>
      </Field>
    )
  }
}

function AlignmentButton({
  alignment,
  onChange,
  checked,
}: {
  alignment: FieldValue
  onChange: (e: SyntheticEvent) => void
  checked: boolean
}) {
  const IconComponent = AlignmentIcons[alignment]
  return (
    <div className={Styles.AlignmentsButton}>
      <input
        type="radio"
        onChange={onChange}
        value={alignment}
        checked={checked}
      />
      <div>
        <IconComponent />
      </div>
    </div>
  )
}