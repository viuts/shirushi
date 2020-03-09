import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSelect,
  EuiSpacer,
} from '@elastic/eui'

const providers = [
  {
    value: 'rakumachi',
    text: '楽待',
  },
  {
    value: 'homes',
    text: 'ホームズ',
  },
]

const LinkImporter = ({ show, onDismiss, onSubmit }) => {
  const [provider, setProvider] = useState('rakumachi')
  const [url, setUrl] = useState('')

  return (
    <>
      {show && (
        <EuiOverlayMask>
          <EuiModal onClose={onDismiss} initialFocus="[name=popswitch]">
            <EuiModalHeader>
              <EuiModalHeaderTitle>ネットからインポート</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiForm>
                <EuiSelect
                  id="selectDocExample"
                  options={providers}
                  value={provider}
                  onChange={evt => setProvider(evt.target.value)}
                  aria-label="Use aria labels when no actual label is in use"
                />

                <EuiSpacer size="s" />

                <EuiFormRow label="リンク">
                  <EuiFieldText
                    name="link"
                    value={url}
                    onChange={evt => setUrl(evt.target.value)}
                  />
                </EuiFormRow>
              </EuiForm>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={onDismiss}>戻る</EuiButtonEmpty>
              <EuiButton
                onClick={() => onSubmit({ provider, url })}
                fill
              >
                確認
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </>
  )
}

LinkImporter.propTypes = {
  show: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default LinkImporter
