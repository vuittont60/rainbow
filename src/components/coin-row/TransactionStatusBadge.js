import { includes, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { onlyUpdateForPropTypes } from 'recompact';
import SpinnerImageSource from '../../assets/spinner.png';
import TransactionStatusTypes from '../../helpers/transactionStatusTypes';
import { colors, position } from '../../styles';
import { SpinAnimation } from '../animations';
import Icon from '../icons/Icon';
import { RowWithMargins } from '../layout';
import { Text } from '../text';

const StatusProps = {
  [TransactionStatusTypes.failed]: {
    name: 'closeCircled',
    style: position.maxSizeAsObject(12),
  },
  [TransactionStatusTypes.received]: {
    direction: 'down',
    name: 'arrow',
  },
  [TransactionStatusTypes.self]: {
    name: 'dot',
  },
  [TransactionStatusTypes.sent]: {
    name: 'sendSmall',
  },
};

const TransactionStatusBadge = ({ pending, status, ...props }) => {
  const statusColor = pending ? colors.primaryBlue : colors.blueGreyMediumLight;

  return (
    <RowWithMargins align="center" margin={4} {...props}>
      {pending && (
        <SpinAnimation>
          <FastImage
            source={SpinnerImageSource}
            style={position.sizeAsObject(12)}
          />
        </SpinAnimation>
      )}
      {status && includes(Object.keys(StatusProps), status) && (
        <Icon
          color={statusColor}
          style={position.maxSizeAsObject(10)}
          {...StatusProps[status]}
        />
      )}
      <Text color={statusColor} size="smedium" weight="semibold">
        {upperFirst(status)}
      </Text>
    </RowWithMargins>
  );
};

TransactionStatusBadge.propTypes = {
  pending: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(TransactionStatusTypes)),
};

TransactionStatusBadge.defaultProps = {
  status: TransactionStatusTypes.error,
};

export default onlyUpdateForPropTypes(TransactionStatusBadge);
