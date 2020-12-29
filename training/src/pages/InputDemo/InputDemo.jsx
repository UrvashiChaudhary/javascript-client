import React from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioField, ButtonField,
} from '../../components';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../config/constants';

class InputDemo extends React.Component {
  schema = yup.object().shape({
    name: yup.string().min(3).required().label('Name'),
    sport: yup.string().required('Sport is a required field'),
    football: yup.string().label('What you do').when('sport', {
      is: (val) => val === 'football',
      then: yup.string().required(),
      otherwise: yup.string().min(0),
    }),
    cricket: yup.string().label('What you do').when('sport', {
      is: (val) => val === 'cricket',
      then: yup.string().required(),
      otherwise: yup.string().min(0),
    }),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {},
      errors: {},
    };
  }

    handleNameChange = (e) => {
      this.setState({ name: e.target.value }, () => {
        console.log(this.state);
      });
    }

    handleSportChange = (e) => {
      this.setState({ sport: e.target.value }, () => console.log(this.state));
      if (e.target.value === 'Select') {
        this.setState({ sport: '' });
      }
      return e.target.value === 'cricket' ? this.setState({ football: '' }) : this.setState({ cricket: '' });
    }

    handlePositionChange = (e) => {
      const { sport } = this.state;
      return sport === 'cricket' ? this.setState({ cricket: e.target.value }, () => console.log(this.state)) : this.setState({ football: e.target.value }, () => console.log(this.state));
    }

      RadioOption = () => {
        let { radioValue } = this.state;
        const { sport } = this.state;
        if (sport === 'cricket') {
          radioValue = radioOptionsCricket;
        } else if (sport === 'football') {
          radioValue = radioOptionsFootball;
        }
        return (radioValue);
      };

      handleValidate = () => {
        console.log('HandleValidate');
        const {
          name,
          sport,
          football,
          cricket,
        } = this.state;
        this.schema.validate({
          name,
          sport,
          football,
          cricket,
        }, { abortEarly: false })
          .then(() => {
            console.log('EEEEEEEEE');
            this.handleErrors(null);
          })
          .catch((errors) => {
            console.log(errors, 'errorssssss');
            this.handleErrors(errors);
          });
      }

        handleErrors = (errors) => {
          const parsedErrors = {};
          if (errors) {
            errors.inner.forEach((error) => {
              parsedErrors[error.path] = error.message;
            });
          }

          this.setState({
            errors: parsedErrors,
          });
        }

        handleBlur = (field) => () => {
          const { touched } = this.state;
          touched[field] = true;

          this.setState({
            touched,
          }, () => this.handleValidate());
        }

        getError = (field) => {
          const { errors, touched } = this.state;
          console.log(touched, errors, field, touched[field], errors[field]);

          if (!touched[field]) {
            return '';
          }

          return errors[field] || '';
        }

        hasErrors = () => {
          const { errors } = this.state;
          return Object.keys(errors).length !== 0;
        }

        isTouched = () => {
          const { touched } = this.state;
          return Object.keys(touched).length !== 0;
        }

        render() {
          const { sport } = this.state;
          return (
            <>
              <div>
                <p><b>Name:</b></p>
                <TextField error={this.getError('name')} onChange={this.handleNameChange} onBlur={this.handleBlur('name')} />
                <p><b>Select the game you play?</b></p>
                <SelectField
                  error={this.getError('sport')}
                  onChange={this.handleSportChange}
                  options={selectOptions}
                  defaultText="Select"
                  onBlur={this.handleBlur('sport')}
                />
                <div>
                  {
                    (sport === '' || sport === 'Select') ? ''
                      : (
                        <>
                          <p><b>What you do?</b></p>
                          <RadioField
                            error={this.getError(sport)}
                            options={this.RadioOption()}
                            onChange={this.handlePositionChange}
                            onBlur={this.handleBlur(sport)}
                          />
                        </>
                      )
                  }
                </div>
                <div>
                  <ButtonField value="Cancel" />
                  <ButtonField value="Submit" disabled={this.hasErrors() || !this.isTouched()} />
                </div>
              </div>
            </>
          );
        }
}
export default InputDemo;
