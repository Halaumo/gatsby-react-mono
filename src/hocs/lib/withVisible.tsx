import React, { FC } from 'react'

const withVisible = (component: FC): FC<{ visible: boolean }> => {
  const Visible: FC<{ visible: boolean }> = ({ visible, ...props }) => {
    if (!visible) return null
    const WrappedComponent = component
    return <WrappedComponent {...props} />
  }
  return Visible
}

export default withVisible
