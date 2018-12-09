import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import Collapse from '@material-ui/core/Collapse'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
// import ExpandLess from '@material-ui/icons/ExpandLess'
// import ExpandMore from '@material-ui/icons/ExpandMore'

import CleanLink  from '../misc/CleanLink'
import * as navActions from '../../actions/nav'
import UPHLogo from '../../res/images/uph_medan_campus.jpeg'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested1: {
    paddingLeft: theme.spacing.unit * 4,
  },
  nested2: {
    paddingLeft: theme.spacing.unit * 8,
  },
  nested3: {
    paddingLeft: theme.spacing.unit * 12,
  },
  nested4: {
    paddingLeft: theme.spacing.unit * 16,
  },
})

class NestedList extends React.Component {
  state = {
    uploadOpen: false,
    uploadPayrollOpen: false,
    viewOpen: false,
    viewAttendancesOpen: false,
    punctualityReportsOpen: false,
  }

  handleClick = stateName => () => {
    this.setState(state => ({ [stateName]: !state[stateName] }))
  }

  closeDrawer = () => {
    this.props.toggleDrawerOpen(false)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <CleanLink to='/' onClick={this.closeDrawer}>
              <ListSubheader component="div">
                {/* <img src={UPHLogo} alt="HRIS UPH | Medan Campus" style={{ width: '100%' }} /> */}
              </ListSubheader>
            </CleanLink>
          }
        >
          <CleanLink to='/' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </ListItem>
          </CleanLink>
          <CleanLink to='/products' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
              <ListItemText inset primary="Products" />
            </ListItem>
          </CleanLink>
          <CleanLink to='/products' onClick={e => {e.preventDefault(); window.location = "http://localhost:3020/dashboard";}}>
            <ListItem button>
              <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
              <ListItemText inset primary="Mutations" />
            </ListItem>
          </CleanLink>
        </List>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(null, navActions)
)(NestedList)
