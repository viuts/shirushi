import React from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import {
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
  EuiSelect,
  EuiSpacer,
  EuiAccordion,
} from '@elastic/eui'

import Constant from '../../../Config/Constant'

const ParameterForm = ({ paramStore }) => {
  return (
    <EuiPanel>
      <h4><b>物件情報</b></h4>
      <EuiSpacer size="s" />

      <EuiFormRow label="物件価格" display="columnCompressed">
        <EuiFieldText
          value={paramStore.price}
          onChange={(evt) => { paramStore.saveParams({ price: evt.target.value }) }}
          append="万円"
          compressed
        />
      </EuiFormRow>

      <EuiFormRow label="表面利回り" display="columnCompressed">
        <EuiFieldText
          value={paramStore.profitRate}
          onChange={(evt) => { paramStore.saveParams({ profitRate: evt.target.value }) }}
          append="%"
          compressed
        />
      </EuiFormRow>

      <EuiFormRow
        label="物件構造"
        display="columnCompressed"
      >
        <EuiSelect
          value={paramStore.propertyStructure}
          onChange={(evt) => { paramStore.saveParams({ propertyStructure: evt.target.value }) }}
          options={Object.entries(Constant.PROPERTY_STRUCTURES).map(([key, value]) => {
            return {
              value: key,
              text: value.label,
            }
          })}
          compressed
        />
      </EuiFormRow>

      <EuiFormRow label="築年数" display="columnCompressed">
        <EuiFieldText
          value={paramStore.elapsedYear}
          onChange={(evt) => { paramStore.saveParams({ elapsedYear: evt.target.value }) }}
          append="年"
          compressed
        />
      </EuiFormRow>

      <EuiFormRow label="建物面積" display="columnCompressed">
        <EuiFieldText
          value={paramStore.buildingSize}
          onChange={(evt) => { paramStore.saveParams({ buildingSize: evt.target.value }) }}
          append="㎡"
          compressed
        />
      </EuiFormRow>

      <EuiSpacer size="s" />

      <EuiAccordion
        buttonContent="土地情報を入力"
      >

        <EuiSpacer size="s" />

        <EuiFormRow label="土地面積" display="columnCompressed">
          <EuiFieldText
            value={paramStore.landSize}
            onChange={(evt) => { paramStore.saveParams({ landSize: evt.target.value }) }}
            append="㎡"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="路線価" display="columnCompressed">
          <EuiFieldText
            value={paramStore.roadPrice}
            onChange={(evt) => { paramStore.saveParams({ roadPrice: evt.target.value }) }}
            append="万円㎡"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="エリア利回り" display="columnCompressed">
          <EuiFieldText
            value={paramStore.areaProfitRate}
            onChange={(evt) => { paramStore.saveParams({ areaProfitRate: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>
      </EuiAccordion>

      <EuiSpacer size="s" />

      <EuiAccordion
        buttonContent="詳細設定を表示"
      >
        <EuiSpacer size="s" />

        <EuiFormRow label="自己資金" display="columnCompressed">
          <EuiFieldText
            value={paramStore.selfCapital}
            onChange={(evt) => { paramStore.saveParams({ selfCapital: evt.target.value }) }}
            append="万円"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="金利" display="columnCompressed">
          <EuiFieldText
            value={paramStore.interestRate}
            onChange={(evt) => { paramStore.saveParams({ interestRate: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="ローン期間" display="columnCompressed">
          <EuiFieldText
            value={paramStore.loanDuration}
            onChange={(evt) => { paramStore.saveParams({ loanDuration: evt.target.value }) }}
            append="年"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="入居率" display="columnCompressed">
          <EuiFieldText
            value={paramStore.rentRate}
            onChange={(evt) => { paramStore.saveParams({ rentRate: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="家賃下落率" display="columnCompressed">
          <EuiFieldText
            value={paramStore.rentDecreaseRate}
            onChange={(evt) => { paramStore.saveParams({ rentDecreaseRate: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="管理料" display="columnCompressed">
          <EuiFieldText
            value={paramStore.managementCost}
            onChange={(evt) => { paramStore.saveParams({ managementCost: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="修繕料" display="columnCompressed">
          <EuiFieldText
            value={paramStore.maintainanceCost}
            onChange={(evt) => { paramStore.saveParams({ maintainanceCost: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="購入時諸経費" display="columnCompressed">
          <EuiFieldText
            value={paramStore.purchaseCost}
            onChange={(evt) => { paramStore.saveParams({ purchaseCost: evt.target.value }) }}
            append="万円"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="年間諸経費" display="columnCompressed">
          <EuiFieldText
            value={paramStore.yearlyCost}
            onChange={(evt) => { paramStore.saveParams({ yearlyCost: evt.target.value }) }}
            append="万円"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="税率" display="columnCompressed">
          <EuiFieldText
            value={paramStore.taxRate}
            onChange={(evt) => { paramStore.saveParams({ taxRate: evt.target.value }) }}
            append="%"
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="大規模修繕" display="columnCompressed">
          <>
            <EuiFieldText
              value={paramStore.reformAfter}
              onChange={(evt) => { paramStore.saveParams({ reformAfter: evt.target.value }) }}
              append="年後から"
              compressed
            />
            <EuiSpacer size="xs" />
            <EuiFieldText
              value={paramStore.reformEvery}
              onChange={(evt) => { paramStore.saveParams({ reformEvery: evt.target.value }) }}
              append="年ごとに"
              compressed
            />
            <EuiSpacer size="xs" />
            <EuiFieldText
              value={paramStore.reformFee}
              onChange={(evt) => { paramStore.saveParams({ reformFee: evt.target.value }) }}
              append="万円"
              compressed
            />
          </>
        </EuiFormRow>

      </EuiAccordion>
    </EuiPanel>
  )
}

ParameterForm.propTypes = {
  paramStore: PropTypes.objectOrObservableObject.isRequired,
}

export default inject('paramStore')(observer(ParameterForm))
