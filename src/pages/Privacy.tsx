import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';

const Privacy: React.FC<RouteComponentProps> = () => (
  <Container maxWidth="md">
    <Box my={5}>
      <Typography variant="h2" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1">
        We are very delighted that you have shown interest in our enterprise.
        Data protection is of a particularly high priority for us. The use of
        our Internet pages is possible without any indication of personal data;
        however, if a data subject wants to use special enterprise services via
        our website, processing of personal data could become necessary. If the
        processing of personal data is necessary and there is no statutory basis
        for such processing, we generally obtain consent from the data subject.
        The processing of personal data, such as the name, address, e-mail
        address, or telephone number of a data subject shall always be in line
        with the General Data Protection Regulation (GDPR), and in accordance
        with the country-specific data protection regulations. By means of this
        data protection declaration, our enterprise would like to inform the
        general public of the nature, scope, and purpose of the personal data we
        collect, use and process. Furthermore, data subjects are informed, by
        means of this data protection declaration, of the rights to which they
        are entitled. As the controller, we have implemented numerous technical
        and organizational measures to ensure the most complete protection of
        personal data processed through this website. However, Internet-based
        data transmissions may in principle have security gaps, so absolute
        protection may not be guaranteed. For this reason, every data subject is
        free to transfer personal data to us via alternative means, e.g. by
        telephone.
      </Typography>
    </Box>

    <Box my={5}>
      <Box my={3}>
        <Typography variant="h3" gutterBottom>
          1. Definitions
        </Typography>
        <Typography variant="body1">
          The data protection declaration is based on the terms used by the
          European legislator for the adoption of the General Data Protection
          Regulation (GDPR). Our data protection declaration should be legible
          and understandable. To ensure this, we would like to first explain the
          terminology used. In this data protection declaration, we use, inter
          alia, the following terms:{' '}
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          a. Personal data
        </Typography>
        <Typography variant="body1">
          Personal data means any information relating to an identified or
          identifiable natural person (“data subject”). An identifiable natural
          person is one who can be identified, directly or indirectly, in
          particular by reference to an identifier such as a name, an
          identification number, location data, an online identifier or to one
          or more factors specific to the physical, physiological, genetic,
          mental, economic, cultural or social identity of that natural person.{' '}
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          b. Data subject
        </Typography>
        <Typography variant="body1">
          Data subject is any identified or identifiable natural person, whose
          personal data is processed by the controller responsible for the
          processing.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          c. Processing
        </Typography>
        <Typography variant="body1">
          Processing is any operation or set of operations which is performed on
          personal data or on sets of personal data, whether or not by automated
          means, such as collection, recording, organisation, structuring,
          storage, adaptation or alteration, retrieval, consultation, use,
          disclosure by transmission, dissemination or otherwise making
          available, alignment or combination, restriction, erasure or
          destruction.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          d. Restriction of processing
        </Typography>
        <Typography variant="body1">
          Restriction of processing is the marking of stored personal data with
          the aim of limiting their processing in the future.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          e. Profiling
        </Typography>
        <Typography variant="body1">
          Profiling means any form of automated processing of personal data
          consisting of the use of personal data to evaluate certain personal
          aspects relating to a natural person, in particular to analyse or
          predict aspects concerning that natural person&apos;s performance at
          work, economic situation, health, personal preferences, interests,
          reliability, behaviour, location or movements.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          f. Pseudonymisation
        </Typography>
        <Typography variant="body1">
          Pseudonymisation is the processing of personal data in such a manner
          that the personal data can no longer be attributed to a specific data
          subject without the use of additional information, provided that such
          additional information is kept separately and is subject to technical
          and organisational measures to ensure that the personal data are not
          attributed to an identified or identifiable natural person.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          g. controller or controller responsible for the processing
        </Typography>
        <Typography variant="body1">
          Controller or controller responsible for the processing is the natural
          or legal person, public authority, agency or other body which, alone
          or jointly with others, determines the purposes and means of the
          processing of personal data; where the purposes and means of such
          processing are determined by Union or Member State law, the controller
          or the specific criteria for its nomination may be provided for by
          Union or Member State law.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          h. Processor
        </Typography>
        <Typography variant="body1">
          Processor is a natural or legal person, public authority, agency or
          other body which processes personal data on behalf of the controller.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          i. Recipient
        </Typography>
        <Typography variant="body1">
          Recipient is a natural or legal person, public authority, agency or
          another body, to which the personal data are disclosed, whether a
          third party or not. However, public authorities which may receive
          personal data in the framework of a particular inquiry in accordance
          with Union or Member State law shall not be regarded as recipients;
          the processing of those data by those public authorities shall be in
          compliance with the applicable data protection rules according to the
          purposes of the processing.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          j. Third party
        </Typography>
        <Typography variant="body1">
          Third party is a natural or legal person, public authority, agency or
          body other than the data subject, controller, processor and persons
          who, under the direct authority of the controller or processor, are
          authorised to process personal data.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          k. Consent
        </Typography>
        <Typography variant="body1">
          Consent of the data subject is any freely given, specific, informed
          and unambiguous indication of the data subject&apos;s wishes by which
          he or she, by a statement or by a clear affirmative action, signifies
          agreement to the processing of personal data relating to him or her.
        </Typography>
      </Box>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        2. Name and Address of the controller
      </Typography>
      <Typography variant="body1">
        Controller for the purposes of the General Data Protection Regulation
        (GDPR), other data protection laws applicable in Member states of the
        European Union and other provisions related to data protection is:
        <br />
        Christoph Hanus
        <br />
        Max-Bill-Straße 67
        <br />
        80807 München
        <br />
        info@milou.io
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        3. Cookies
      </Typography>
      <Typography variant="body1">
        Our internet page uses cookies.Cookies are text files that are stored in
        a computer system via an Internet browser. Many Internet sites and
        servers use cookies.Many cookies contain a so - called cookie ID.A
        cookie ID is a unique identifier of the cookie.It consists of a
        character string through which Internet pages and servers can be
        assigned to the specific Internet browser in which the cookie was
        stored.This allows visited Internet sites and servers to differentiate
        the individual browser of the data subject from other Internet browsers
        that contain other cookies.A specific Internet browser can be recognized
        and identified using the unique cookie ID. Through the use of cookies,
        we can provide the users of this website with more user - friendly
        services that would not be possible without the cookie setting. By means
        of a cookie, the information and offers on our website can be optimized
        with the user in mind.Cookies allow us, as previously mentioned, to
        recognize our website users.The purpose of this recognition is to make
        it easier for users to utilize our website.The website user that uses
        cookies, e.g.does not have to enter access data each time the website is
        accessed, because this is taken over by the website, and the cookie is
        thus stored on the user & apos; s computer system.Another example is the
        cookie of a shopping cart in an online shop.The online store remembers
        the articles that a customer has placed in the virtual shopping cart via
        a cookie. The data subject may, at any time, prevent the setting of
        cookies through our website by means of a corresponding setting of the
        Internet browser used, and may thus permanently deny the setting of
        cookies.Furthermore, already set cookies may be deleted at any time via
        an Internet browser or other software programs.This is possible in all
        popular Internet browsers.If the data subject deactivates the setting of
        cookies in the Internet browser used, not all functions of our website
        may be entirely usable.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        4. Collection of general data and information
      </Typography>
      <Typography variant="body1">
        The website collects a series of general data and information when a
        data subject or automated system calls up the website.This general data
        and information are stored in the server log files.Collected may be(1)
        the browser types and versions used, (2) the operating system used by
        the accessing system, (3) the website from which an accessing system
        reaches our website(so - called referrers), (4) the sub - websites, (5)
        the date and time of access to the Internet site, (6) an Internet
        protocol address(IP address), (7) the Internet service provider of the
        accessing system, and(8) any other similar data and information that may
        be used in the event of attacks on our information technology systems.
        When using these general data and information, we do not draw any
        conclusions about the data subject.Rather, this information is needed
        to(1) deliver the content of our website correctly, (2) optimize the
        content of our website as well as its advertisement, (3) ensure the long
        - term viability of our information technology systems and website
        technology, and(4) provide law enforcement authorities with the
        information necessary for criminal prosecution in case of a cyber -
        attack.Therefore, we analyze anonymously collected data and information
        statistically, with the aim of increasing the data protection and data
        security of our enterprise, and to ensure an optimal level of protection
        for the personal data we process.The anonymous data of the server log
        files are stored separately from all personal data provided by a data
        subject.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        5. possibility of contact via the website
      </Typography>
      <Typography variant="body1">
        Due to legal regulations, the website contains information that enables
        rapid electronic contact with our company and direct communication with
        us, which also includes a general address of the so - called electronic
        mail(e - mail address).If a data subject contacts the data controller by
        e - mail or via a contact form, the personal data transmitted by the
        data subject is automatically stored.Such personal data transmitted
        voluntarily by a data subject to the data controller are stored for the
        purposes of processing or contacting the data subject.This personal data
        will not be passed on to third parties.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        6. Routine erasure and blocking of personal data
      </Typography>
      <Typography variant="body1">
        The data controller shall process and store the personal data of the
        data subject only for the period necessary to achieve the purpose of
        storage, or as far as this is granted by the European legislator or
        other legislators in laws or regulations to which the controller is
        subject to. If the storage purpose is not applicable, or if a storage
        period prescribed by the European legislator or another competent
        legislator expires, the personal data are routinely blocked or erased in
        accordance with legal requirements.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        7. Rights of the data subject
      </Typography>
      <Typography variant="body1">
        Any person concerned shall have the right for information pursuant to
        Article 15 GDPR to rectification under Article 16 GDPR to cancellation
        under Article 17 GDPR to limit the processing pursuant to Article 18
        GDPR to appeal under Article 21 GDPR, and to data transferability under
        Article 20 GDPR. The restrictions in §§ 34 and 35 BDSG apply to the
        right to information and the right to cancellation.In addition, there is
        a right of complaint of a competent data protection supervisory
        authority(Article 77 GDPR & 19 BDSG). You can revoke your consent to the
        processing of personal data at any time.This also applies to the
        revocation of declarations of consent given to us prior to the
        application of the General Data Protection Regulation, i.e.before 25 May
        2018. Please note that the revocation will only take effect in the
        future.Processing that took place before the revocation is not affected.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        8. Data protection provisions Google Analytics(with anonymization
        function)
      </Typography>
      <Typography variant="body1">
        On this website, the controller has integrated the component of Google
        Analytics(with the anonymizer function).Google Analytics is a web
        analytics service.Web analytics is the collection, gathering, and
        analysis of data about the behavior of visitors to websites.A web
        analysis service collects, inter alia, data about the website from which
        a person has come(the so - called referrer), which sub - pages were
        visited, or how often and for what duration a sub - page was viewed.Web
        analytics are mainly used for the optimization of a website and in order
        to carry out a cost - benefit analysis of Internet advertising. The
        operator of the Google Analytics component is Google Ireland Limited,
        Gordon House, Barrow Street, Dublin 4, Irland. For the web analytics
        through Google Analytics the controller uses the application & quot;
        _gat._anonymizeIp & quot;.By means of this application the IP address of
        the Internet connection of the data subject is abridged by Google and
        anonymised when accessing our websites from a Member State of the
        European Union or another Contracting State to the Agreement on the
        European Economic Area. The purpose of the Google Analytics component is
        to analyze the traffic on our website.Google uses the collected data and
        information, inter alia, to evaluate the use of our website and to
        provide online reports, which show the activities on our websites, and
        to provide other services concerning the use of our Internet site for
        us. Google Analytics places a cookie on the information technology
        system of the data subject.The definition of cookies is explained
        above.With the setting of the cookie, Google is enabled to analyze the
        use of our website.With each call - up to one of the individual pages of
        this Internet site, which is operated by the controller and into which a
        Google Analytics component was integrated, the Internet browser on the
        information technology system of the data subject will automatically
        submit data through the Google Analytics component for the purpose of
        online advertising and the settlement of commissions to Google.During
        the course of this technical procedure, the enterprise Google gains
        knowledge of personal information, such as the IP address of the data
        subject, which serves Google, inter alia, to understand the origin of
        visitors and clicks, and subsequently create commission settlements. The
        cookie is used to store personal information, such as the access time,
        the location from which the access was made, and the frequency of visits
        of our website by the data subject.With each visit to our Internet site,
        such personal data, including the IP address of the Internet access used
        by the data subject, will be transmitted to Google in the United States
        of America.These personal data are stored by Google in the United States
        of America.Google may pass these personal data collected through the
        technical procedure to third parties. The data subject may, as stated
        above, prevent the setting of cookies through our website at any time by
        means of a corresponding adjustment of the web browser used and thus
        permanently deny the setting of cookies.Such an adjustment to the
        Internet browser used would also prevent Google Analytics from setting a
        cookie on the information technology system of the data subject.In
        addition, cookies already in use by Google Analytics may be deleted at
        any time via a web browser or other software programs. In addition, the
        data subject has the possibility of objecting to a collection of data
        that are generated by Google Analytics, which is related to the use of
        this website, as well as the processing of this data by Google and the
        chance to preclude any such.For this purpose, the data subject must
        download a browser add - on under the link
        https://tools.google.com/dlpag... and install it. This browser add-on
        tells Google Analytics through a JavaScript, that any data and
        information about the visits of Internet pages may not be transmitted to
        Google Analytics. The installation of the browser add-ons is considered
        an objection by Google. If the information technology system of the data
        subject is later deleted, formatted, or newly installed, then the data
        subject must reinstall the browser add-ons to disable Google Analytics.
        If the browser add-on was uninstalled by the data subject or any other
        person who is attributable to their sphere of competence, or is
        disabled, it is possible to execute the reinstallation or reactivation
        of the browser add-ons. Further information and the applicable data
        protection provisions of Google may be retrieved under
        https://www.google.com/intl/en... and under
        http://www.google.com/analytic.... Google Analytics is further explained
        under the following Link https://www.google.com/analyti....
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        9. Data protection provisions LinkedIn
      </Typography>
      <Typography variant="body1">
        The controller has integrated components of the LinkedIn Corporation on
        this website.LinkedIn is a web - based social network that enables users
        with existing business contacts to connect and to make new business
        contacts.Over 400 million registered people in more than 200 countries
        use LinkedIn.Thus, LinkedIn is currently the largest platform for
        business contacts and one of the most visited websites in the world. The
        operating company of LinkedIn is LinkedIn Corporation, 2029 Stierlin
        Court Mountain View, CA 94043, UNITED STATES.For privacy matters outside
        of the UNITED STATES LinkedIn Ireland, Privacy Policy Issues, Wilton
        Plaza, Wilton Place, Dublin 2, Ireland, is responsible. With each call -
        up to one of the individual pages of this Internet site, which is
        operated by the controller and on which a LinkedIn component(LinkedIn
        plug -in) was integrated, the Internet browser on the information
        technology system of the data subject is automatically prompted to the
        download of a display of the corresponding LinkedIn component of
        LinkedIn.Further information about the LinkedIn plug -in may be accessed
        under https://developer.linkedin.com/plugins. During the course of this
        technical procedure, LinkedIn gains knowledge of what specific sub-page
        of our website was visited by the data subject. If the data subject is
        logged in at the same time on LinkedIn, LinkedIn detects with every call
        - up to our website by the data subject—and for the entire duration of
        their stay on our Internet site—which specific sub - page of our
        Internet page was visited by the data subject.This information is
        collected through the LinkedIn component and associated with the
        respective LinkedIn account of the data subject.If the data subject
        clicks on one of the LinkedIn buttons integrated on our website, then
        LinkedIn assigns this information to the personal LinkedIn user account
        of the data subject and stores the personal data. LinkedIn receives
        information via the LinkedIn component that the data subject has visited
        our website, provided that the data subject is logged in at LinkedIn at
        the time of the call - up to our website.This occurs regardless of
        whether the person clicks on the LinkedIn button or not.If such a
        transmission of information to LinkedIn is not desirable for the data
        subject, then he or she may prevent this by logging off from their
        LinkedIn account before a call - up to our website is made. LinkedIn
        provides under https://www.linkedin.com/psett... the possibility to
        unsubscribe from e-mail messages, SMS messages and targeted ads, as well
        as the ability to manage ad settings. LinkedIn also uses affiliates such
        as Eire, Google Analytics, BlueKai, DoubleClick, Nielsen, Comscore,
        Eloqua, and Lotame. The setting of such cookies may be denied under
        https://www.linkedin.com/legal.... The applicable privacy policy for
        LinkedIn is available under https://www.linkedin.com/legal.... The
        LinkedIn Cookie Policy is available under
        https://www.linkedin.com/legal....
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        10. Legal basis for the processing
      </Typography>
      <Typography variant="body1">
        Art. 6(1) lit.a GDPR serves as the legal basis for processing operations
        for which we obtain consent for a specific processing purpose.If the
        processing of personal data is necessary for the performance of a
        contract to which the data subject is party, as is the case, for
        example, when processing operations are necessary for the supply of
        goods or to provide any other service, the processing is based on
        Article 6(1) lit.b GDPR.The same applies to such processing operations
        which are necessary for carrying out pre - contractual measures, for
        example in the case of inquiries concerning our products or services.Is
        our company subject to a legal obligation by which processing of
        personal data is required, such as for the fulfillment of tax
        obligations, the processing is based on Art. 6(1) lit.c GDPR.In rare
        cases, the processing of personal data may be necessary to protect the
        vital interests of the data subject or of another natural person.This
        would be the case, for example, if a visitor were injured in our company
        and his name, age, health insurance data or other vital information
        would have to be passed on to a doctor, hospital or other third
        party.Then the processing would be based on Art. 6(1) lit.d
        GDPR.Finally, processing operations could be based on Article 6(1) lit.f
        GDPR.This legal basis is used for processing operations which are not
        covered by any of the abovementioned legal grounds, if processing is
        necessary for the purposes of the legitimate interests pursued by our
        company or by a third party, except where such interests are overridden
        by the interests or fundamental rights and freedoms of the data subject
        which require protection of personal data.Such processing operations are
        particularly permissible because they have been specifically mentioned
        by the European legislator.He considered that a legitimate interest
        could be assumed if the data subject is a client of the
        controller(Recital 47 Sentence 2 GDPR).
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        11. The legitimate interests pursued by the controller or by a third
        party
      </Typography>
      <Typography variant="body1">
        Where the processing of personal data is based on Article 6(1) lit.f
        GDPR our legitimate interest is to carry out our business in favor of
        the well - being of all our employees and the shareholders.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        12. Period for which the personal data will be stored
      </Typography>
      <Typography variant="body1">
        The criteria used to determine the period of storage of personal data is
        the respective statutory retention period.After expiration of that
        period, the corresponding data is routinely deleted, as long as it is no
        longer necessary for the fulfillment of the contract or the initiation
        of a contract.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        13. Provision of personal data as statutory or contractual requirement;
        Requirement necessary to enter into a contract; Obligation of the data
        subject to provide the personal data; possible consequences of failure
        to provide such data
      </Typography>
      <Typography variant="body1">
        We clarify that the provision of personal data is partly required by
        law(e.g.tax regulations) or can also result from contractual
        provisions(e.g.information on the contractual partner).Sometimes it may
        be necessary to conclude a contract that the data subject provides us
        with personal data, which must subsequently be processed by us.The data
        subject is, for example, obliged to provide us with personal data when
        our company signs a contract with him or her.The non - provision of the
        personal data would have the consequence that the contract with the data
        subject could not be concluded.Before personal data is provided by the
        data subject, the data subject must contact our Data Protection
        Officer.Our Data Protection Officer clarifies to the data subject
        whether the provision of the personal data is required by law or
        contract or is necessary for the conclusion of the contract, whether
        there is an obligation to provide the personal data and the consequences
        of non - provision of the personal data.
      </Typography>
    </Box>

    <Box my={5}>
      <Typography variant="h3" gutterBottom>
        14. Existence of automated decision - making
      </Typography>
      <Typography variant="body1">
        As a responsible company, we do not use automatic decision - making or
        profiling.
      </Typography>
    </Box>
  </Container>
);

export default Privacy;
