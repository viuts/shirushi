import React from 'react'

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '@elastic/eui'

export default () => (
  <EuiHeader>
    <EuiHeaderSectionItem border="right">
      <EuiHeaderLogo iconType="help" href="#">Shirushi</EuiHeaderLogo>
    </EuiHeaderSectionItem>

    <EuiHeaderLinks>
      <EuiHeaderLink href="#" isActive>
        Simulator
      </EuiHeaderLink>
    </EuiHeaderLinks>
  </EuiHeader>
)
