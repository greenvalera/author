import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Link as MaterialLink} from '@mui/material';

interface Props {
  children: React.ReactNode,
  to: string
}

export default function Link({children, to}: Props) {
  return (<MaterialLink to={to} variant="body2" component={RouterLink}>{children}</MaterialLink>)
};