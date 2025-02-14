import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';

let client = new Client('api_key')

describe('Successfully sent invoice update payment status responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/invoices/lago_id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updateInvoicePaymentStatus({lagoId: 'lago_id', paymentStatus: 'succeeded'})

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/invoices/lago_id'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/invoices/lago_id')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.updateInvoicePaymentStatus({lagoId: 'lago_id', paymentStatus: 'succeeded'})
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully request invoice download responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/invoices/lago_id/download')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.downloadInvoice('lago_id')

        expect(response).to.be
    });
});

describe('Successfully sent invoice find request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/invoices/id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findInvoice('id')

        expect(response).to.be
    });
});

describe('Successfully sent invoice find all request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/invoices')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllInvoices()

        expect(response).to.be
    });
});

describe('Successfully sent invoice find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/invoices?per_page=2&page=3')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllInvoices({per_page: 2, page: 3})

        expect(response).to.be
    });
});
