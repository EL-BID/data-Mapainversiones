import { Grid, Card, CardContent, Typography, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

const MapaInvCountries = () => {
  const countries = Array(6).fill({
    name: "Republica Dominicana",
    url: "mapainversiones.economia.gob.do/",
    year: "2018",
    flag: "/assets/dominican-republic-flag.png",
  });

  return (
    <Card sx={{ px: 18, py: 7 }}>
      <CardContent>
        <Typography fontWeight={700} fontSize="28px" gutterBottom mb={3}>
          Países que ya implementaron MapaInversiones
        </Typography>
        <Grid container spacing={2}>
          {countries.map((country, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Image
                        src={country.flag}
                        alt={`${country.name} flag`}
                        width={30}
                        height={30}
                      />
                    </Grid>
                    <Grid item>
                      <Link href="/country" component={NextLink}>
                        <Typography variant="subtitle1">
                          {country.name}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="textSecondary">
                    {country.url}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {country.year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MapaInvCountries;
