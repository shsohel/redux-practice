import { Card, CardBody, CardHeader, CardLink, CardText, CardTitle } from 'reactstrap';


const Home = () => {
  return (
    <div>


      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We are working .....
          </CardText>
          <CardText>
            Please read the update log
            <CardLink
              href='/last-update'
              target='_blank'
            >
              {` ${' HERE '}`}
            </CardLink>
            to see the progress task!
          </CardText>
        </CardBody>
      </Card>

    </div>
  );
};

export default Home;
