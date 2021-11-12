import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Hero from "./Hero";

/**
 * Komponen ErrorBoundary
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  };

  /**
   * tangkap error
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  };

  render() {
    const { error, errorInfo } = this.state;

    if (this.state.errorInfo) {
      return (
        <Container maxWidth="md">
      		<Grid container spacing={3} pb={2}>
      			<Grid item xs={12}>
      				<Hero leftTitle="There is an error_" rightTitle="Error" />
      			</Grid>

      			<Grid item xs={12} mt={5}>
	      			<details>
	      				<Typography variant="subtitle1">
				        	{error && error.toString()}
	      				</Typography>
	      				
	      				<br />

	      				<Typography variant="body1">
				        	{errorInfo.componentStack}
	      				</Typography>
	      			</details>
      			</Grid>
      		</Grid>
      	</Container>
      );
    }

    return this.props.children;
  };
};

export default ErrorBoundary;